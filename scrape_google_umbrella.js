const https = require('https');
const query = encodeURIComponent('로열스테디 튼튼한 초경량 UV 접이식 우양산');
const url = 'https://www.google.com/search?q=' + query + '&tbm=isch';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = [];
    // Extract actual image URLs from Google Images (often encrypted or base64, but sometimes we can find standard http links)
    const regex = /<img[^>]+src="([^"]+)"/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      if(match[1].startsWith('http') && !match[1].includes('branding/googlelogo')) {
        urls.push(match[1]);
      }
    }
    console.log(JSON.stringify(urls.slice(0, 7), null, 2));
  });
});
