const https = require('https');

const options = {
  hostname: 'www.google.com',
  path: '/search?q=' + encodeURIComponent('LG 휘센 위너 스탠드형 에어컨') + '&tbm=isch',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    // Extract image URLs from Google Images (encrypted or plain)
    const matches = data.match(/https:\/\/encrypted-tbn0\.gstatic\.com\/images\?q=tbn:[^\"]+/g);
    if (matches) {
      console.log([...new Set(matches)].slice(0, 5).join('\n'));
    } else {
      console.log('No matches');
    }
  });
});
