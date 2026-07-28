const {
  CREDENTIALS_RELATIVE_PATH,
  REQUIRED_KEYS,
  loadCredentials,
} = require('./lib/coupang-partners-api.cjs');

try {
  loadCredentials();
  console.log(JSON.stringify({ ready: true, missing: [], path: CREDENTIALS_RELATIVE_PATH }));
} catch (error) {
  const message = String(error.message || '');
  const missing = REQUIRED_KEYS.filter((key) => message.includes(key));
  console.log(JSON.stringify({ ready: false, missing: missing.length ? missing : REQUIRED_KEYS, path: CREDENTIALS_RELATIVE_PATH }));
  process.exitCode = 1;
}
