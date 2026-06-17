const https = require('https');

const url = 'https://www.coupang.com/vp/products/218520566?itemId=490814306';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Accept-Language': 'ko-KR,ko;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // try to match the sdp JSON block
    const match = data.match(/exports\.sdp = ({.*});/);
    if (match && match[1]) {
      try {
        const sdp = JSON.parse(match[1]);
        const images = sdp.options?.images || [];
        const detailUrl = sdp.vendorItemDetail?.detailUrl || '';
        console.log('Main Images:', images.map(img => img.origin));
        
        if (detailUrl) {
            console.log('Fetching detail images from:', detailUrl);
            https.get('https://www.coupang.com' + detailUrl, options, (res2) => {
                let detailData = '';
                res2.on('data', chunk => detailData += chunk);
                res2.on('end', () => {
                   const detailImages = [...detailData.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
                   console.log('Detail Images:', detailImages);
                });
            });
        }
        
      } catch (e) {
        console.error('Error parsing JSON');
      }
    } else {
        // Fallback: regex search for all coupangcdn URLs
        const imgMatches = [...data.matchAll(/https?:\/\/[a-zA-Z0-9.-]*coupangcdn\.com[^"'\s\\]+/g)].map(m => m[0]);
        console.log('Regex found images:', [...new Set(imgMatches)].filter(s => s.includes('retail')));
    }
  });
}).on('error', console.error);
