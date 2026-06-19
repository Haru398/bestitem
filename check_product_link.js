const https = require('https');

const url = 'https://link.coupang.com/a/eEuujpmwvI';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ko-KR,ko;q=0.9',
  },
  maxRedirects: 0,
};

const req = https.get(url, options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Location:', res.headers.location);
  console.log('All headers:', JSON.stringify(res.headers, null, 2));
});
req.on('error', e => console.error(e));
