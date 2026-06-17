const https = require('https');
const options = {
  hostname: 'www.newtreemall.co.kr',
  path: '/goods/goods_view.php?goodsNo=1000000008',
  headers: { 'User-Agent': 'Mozilla/5.0' }
};
https.get(options, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const urls = [];
    const regex = /<img[^>]+src="([^"]+)"/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      if (match[1].includes('goods') || match[1].includes('detail') || match[1].includes('data/')) {
        urls.push(match[1].startsWith('http') ? match[1] : 'https://www.newtreemall.co.kr' + (match[1].startsWith('/') ? '' : '/') + match[1]);
      }
    }
    console.log(JSON.stringify([...new Set(urls)].slice(0, 10), null, 2));
  });
}).on('error', console.error);
