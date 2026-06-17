const https = require('https');
https.get('https://0xsolpi.com/vuenes-uv-sun-cap-review/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src="([^"]+)"/g);
    if(matches) {
      matches.forEach(m => {
        const urlMatch = m.match(/src="([^"]+)"/);
        if(urlMatch) console.log(urlMatch[1]);
      });
    }
  });
});
