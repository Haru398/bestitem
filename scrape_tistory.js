const https = require('https');
const url = process.argv[2];
https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const imgMatches = data.match(/<img[^>]+src="([^"]+)"/g);
    if(imgMatches) {
        imgMatches.forEach(m => {
            const match = m.match(/src="([^"]+)"/);
            if(match) {
                let src = match[1];
                if (src.includes('fname=')) {
                    src = decodeURIComponent(src.split('fname=')[1]);
                }
                if(!src.includes('new_ico_5') && src.includes('kakaocdn.net')) {
                    console.log(src);
                }
            }
        })
    }
  });
});
