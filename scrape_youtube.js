const https = require('https');

https.get('https://www.youtube.com/results?search_query=' + encodeURIComponent('LG 휘센 에어컨 위너 스탠드형 리뷰'), (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    // Extract thumbnail URLs
    const matches = data.match(/https:\/\/i\.ytimg\.com\/vi\/[A-Za-z0-9_-]+\/hqdefault\.jpg/g);
    if (matches) {
      console.log([...new Set(matches)].slice(0, 5).join('\n'));
    } else {
      console.log('No matches');
    }
  });
});
