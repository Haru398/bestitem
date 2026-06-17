const fs = require('fs');

let data = JSON.parse(fs.readFileSync('src/app/data.json', 'utf8'));

// Filter out item-shorts-1
data = data.filter(item => item.id !== 'item-shorts-1');

fs.writeFileSync('src/app/data.json', JSON.stringify(data, null, 2));
console.log('Successfully removed item-shorts-1 from data.json');
