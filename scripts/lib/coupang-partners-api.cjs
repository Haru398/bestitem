const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const API_HOST = 'api-gateway.coupang.com';
const API_PREFIX = '/v2/providers/affiliate_open_api/apis/openapi';
const CREDENTIALS_RELATIVE_PATH = path.join('coupang-partners', 'credentials.env');
const REQUIRED_KEYS = ['COUPANG_ACCESS_KEY', 'COUPANG_SECRET_KEY'];

function parseEnv(text) {
  return Object.fromEntries(text.split(/\r?\n/).map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => {
      const separator = line.indexOf('=');
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }));
}

function loadCredentials(root = process.cwd()) {
  const credentialsPath = path.join(root, CREDENTIALS_RELATIVE_PATH);
  if (!fs.existsSync(credentialsPath)) {
    throw new Error(`Missing local credentials file: ${CREDENTIALS_RELATIVE_PATH}`);
  }
  const credentials = parseEnv(fs.readFileSync(credentialsPath, 'utf8'));
  const missing = REQUIRED_KEYS.filter((key) => !credentials[key] || credentials[key].startsWith('PUT_'));
  if (missing.length) throw new Error(`Missing local credentials: ${missing.join(', ')}`);
  return { accessKey: credentials.COUPANG_ACCESS_KEY, secretKey: credentials.COUPANG_SECRET_KEY };
}

function utcSignedDate(date = new Date()) {
  const part = (value) => String(value).padStart(2, '0');
  return `${String(date.getUTCFullYear()).slice(-2)}${part(date.getUTCMonth() + 1)}${part(date.getUTCDate())}`
    + `T${part(date.getUTCHours())}${part(date.getUTCMinutes())}${part(date.getUTCSeconds())}Z`;
}

function createAuthorization({ method, pathWithQuery, accessKey, secretKey, date = new Date() }) {
  const queryIndex = pathWithQuery.indexOf('?');
  const pathPart = queryIndex === -1 ? pathWithQuery : pathWithQuery.slice(0, queryIndex);
  const query = queryIndex === -1 ? '' : pathWithQuery.slice(queryIndex + 1);
  const signedDate = utcSignedDate(date);
  const signature = crypto.createHmac('sha256', secretKey)
    .update(`${signedDate}${method.toUpperCase()}${pathPart}${query}`, 'utf8').digest('hex');
  return `CEA algorithm=HmacSHA256,access-key=${accessKey},signed-date=${signedDate},signature=${signature}`;
}

async function request({ method, pathWithQuery, body, root = process.cwd() }) {
  const { accessKey, secretKey } = loadCredentials(root);
  const headers = {
    Authorization: createAuthorization({ method, pathWithQuery, accessKey, secretKey }),
    Accept: 'application/json',
  };
  const options = { method, headers };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`https://${API_HOST}${pathWithQuery}`, options);
  const text = await response.text();
  let payload;
  try { payload = JSON.parse(text); } catch { payload = { raw: text.slice(0, 500) }; }
  if (!response.ok || payload.rCode && payload.rCode !== '0') {
    throw new Error(`Coupang Partners API ${payload.rCode ?? payload.code ?? response.status}: ${payload.rMessage ?? payload.message ?? 'request failed'}`);
  }
  return payload.data;
}

async function searchProducts({ keyword, limit = 10, root }) {
  const normalizedKeyword = String(keyword || '').trim();
  if (!normalizedKeyword) throw new Error('A non-empty product query is required.');
  const normalizedLimit = Number(limit);
  if (!Number.isInteger(normalizedLimit) || normalizedLimit < 1 || normalizedLimit > 10) {
    throw new Error('limit must be an integer from 1 to 10.');
  }
  const query = new URLSearchParams({ keyword: normalizedKeyword, limit: String(normalizedLimit) });
  return request({ method: 'GET', pathWithQuery: `${API_PREFIX}/products/search?${query.toString()}`, root });
}

function isCoupangProductUrl(value) {
  try {
    const url = new URL(String(value));
    return url.protocol === 'https:' && ['www.coupang.com', 'coupang.com'].includes(url.hostname);
  } catch { return false; }
}

function isCoupangAffiliateUrl(value) {
  try {
    const url = new URL(String(value));
    if (url.protocol !== 'https:' || url.hostname !== 'link.coupang.com') return false;
    if (url.pathname.startsWith('/a/')) return true;
    return url.pathname === '/re/AFFSDP' && url.searchParams.has('lptag') && url.searchParams.has('pageKey');
  } catch { return false; }
}

async function createDeepLink({ productUrl, root }) {
  if (!isCoupangProductUrl(productUrl)) {
    throw new Error('A canonical Coupang product URL is required for deep-link generation.');
  }
  const result = await request({
    method: 'POST',
    pathWithQuery: `${API_PREFIX}/v1/deeplink`,
    body: { coupangUrls: [productUrl] },
    root,
  });
  const item = Array.isArray(result) ? result[0] : null;
  const affiliateUrl = item?.shortenUrl || item?.landingUrl;
  if (!isCoupangAffiliateUrl(affiliateUrl)) {
    throw new Error('The API response did not contain a valid Coupang Partners deep link.');
  }
  return { originalUrl: item.originalUrl || productUrl, affiliateUrl };
}

function summarizeProduct(product) {
  return {
    productId: product.productId,
    productName: product.productName,
    productPrice: product.productPrice,
    productUrl: product.productUrl,
    productImage: product.productImage,
    categoryName: product.categoryName,
    isRocket: Boolean(product.isRocket),
    isFreeShipping: Boolean(product.isFreeShipping),
  };
}

module.exports = {
  CREDENTIALS_RELATIVE_PATH,
  REQUIRED_KEYS,
  createAuthorization,
  createDeepLink,
  isCoupangAffiliateUrl,
  loadCredentials,
  searchProducts,
  summarizeProduct,
};
