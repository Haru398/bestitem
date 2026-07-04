const https = require('https');

function getYoutubeVideoId(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/"videoId":"([^"]{11})"/);
        if (match && match[1]) {
          resolve(match[1]);
        } else {
          resolve('dQw4w9WgXcQ'); // fallback
        }
      });
    }).on('error', () => resolve('dQw4w9WgXcQ'));
  });
}

getYoutubeVideoId('SAPPHIRE 라데온 RX 7600 PULSE 리뷰').then(console.log);
