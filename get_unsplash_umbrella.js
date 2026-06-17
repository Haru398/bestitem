const https = require('https');

https.get('https://unsplash.com/s/photos/umbrella', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^"&?\\]*/g;
    const matches = [...new Set(data.match(regex))].filter(u => u.includes('photo') && !u.includes('profile'));
    console.log('Images:');
    matches.slice(0, 5).forEach(u => console.log(u));
  });
}).on('error', console.error);
