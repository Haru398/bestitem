const https = require('https');

const options = {
  hostname: 'search.daum.net',
  path: '/search?w=img&q=' + encodeURIComponent('LG 휘센 위너 스탠드 에어컨'),
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    // Look for image URLs in Daum search results
    // Daum typically uses URLs like https://search1.kakaocdn.net/... or http://t1.daumcdn.net/...
    const matches = data.match(/https?:\/\/[a-zA-Z0-9\-\.]+(?:daumcdn\.net|kakaocdn\.net)[^\'\"]+\.(?:jpg|jpeg|png)/gi);
    if (matches) {
      console.log([...new Set(matches)].slice(0, 10).join('\n'));
    } else {
      console.log('No matches');
    }
  });
});
