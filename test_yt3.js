const https = require('https');

function getYoutubeVideoIds(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = [...data.matchAll(/"videoId":"([^"]{11})"/g)];
        const ids = [...new Set(matches.map(m => m[1]))];
        resolve(ids.slice(0, 5));
      });
    }).on('error', () => resolve([]));
  });
}

getYoutubeVideoIds('RX 7600 리뷰').then(console.log);
