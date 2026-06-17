const https = require('https');

https.get('https://search.danawa.com/dSearch.php?query=DXTE120-MPK', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const regex = /<img[^>]+src="([^">]+(jpg|png|jpeg))"[^>]*>/gi;
    let match;
    const images = [];
    while ((match = regex.exec(data)) !== null) {
      if (match[1].includes('prod_img')) {
        images.push(match[1]);
      }
    }
    if (images.length > 0) {
      let imgUrl = images[0];
      if (imgUrl.startsWith('//')) {
        imgUrl = 'https:' + imgUrl;
      }
      console.log("FOUND_IMG:", imgUrl);
    } else {
      console.log("FOUND_IMG: NOT_FOUND");
    }
  });
}).on('error', e => console.error(e));
