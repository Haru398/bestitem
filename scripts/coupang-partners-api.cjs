const {
  CREDENTIALS_RELATIVE_PATH,
  REQUIRED_KEYS,
  createDeepLink,
  loadCredentials,
  searchProducts,
  summarizeProduct,
} = require('./lib/coupang-partners-api.cjs');

function getOption(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

async function main() {
  const command = process.argv[2];
  if (!command || ['--help', '-h'].includes(command)) {
    console.log('Usage: coupang:api <check|search|deeplink> [options]');
    return;
  }
  if (command === 'check') {
    loadCredentials();
    const sample = await searchProducts({ keyword: '쿠팡', limit: 1 });
    console.log(JSON.stringify({
      ready: true,
      path: CREDENTIALS_RELATIVE_PATH,
      requiredKeys: REQUIRED_KEYS,
      apiReachable: true,
      sampleResultCount: Array.isArray(sample?.productData) ? sample.productData.length : 0,
    }));
    return;
  }
  if (command === 'search') {
    const data = await searchProducts({ keyword: getOption('--query'), limit: getOption('--limit') || 10 });
    const products = Array.isArray(data?.productData) ? data.productData.map(summarizeProduct) : [];
    console.log(JSON.stringify({ landingUrl: data?.landingUrl || null, products }, null, 2));
    return;
  }
  if (command === 'deeplink') {
    console.log(JSON.stringify(await createDeepLink({ productUrl: getOption('--url') }), null, 2));
    return;
  }
  fail(`Unknown command: ${command}`);
}

main().catch((error) => fail(error.message));
