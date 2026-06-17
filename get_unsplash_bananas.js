const https = require('https');

https.get('https://unsplash.com/s/photos/banana', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^"&?\\]*/g;
    const matches = [...new Set(data.match(regex))].filter(u => u.includes('photo'));
    console.log('Unsplash Banana Images:');
    matches.slice(0, 10).forEach(u => console.log(u));
  });
}).on('error', console.error);
