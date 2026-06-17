const https = require('https');

https.get('https://search.danawa.com/dSearch.php?query=' + encodeURIComponent('LG 휘센 오브제컬렉션 위너 에어컨'), (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    // Extract image URLs
    const matches = data.match(/src="(https?:\/\/[^\"]+img\.danawa\.com[^\"]+)"/g);
    if (matches) {
      console.log([...new Set(matches)].slice(0, 5).join('\n'));
    } else {
      console.log('No matches found');
    }
  });
});
