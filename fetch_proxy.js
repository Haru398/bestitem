const https = require('https');

https.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.coupang.com/vp/products/28424926414'), (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const matches = json.contents.match(/vendor_inventory[^\"\'\\]+\.(jpg|png|jpeg)/g);
      if (matches) {
        console.log([...new Set(matches)].join('\n'));
      } else {
        console.log('No images found');
      }
    } catch (e) {
      console.error(e);
    }
  });
});
