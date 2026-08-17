const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const file = path.join(root, 'content', 'scheduled', 'product-candidates.json');
const approved = new Map([
  ['9557909195', { query: '삼성 갤럭시 A57 128GB 듀얼심 자급제', required: ['삼성', 'A57', '128GB', '듀얼심'] }],
  ['9683298057', { query: 'WD BLACK SN850X 1TB SSD', required: ['WD', 'SN850X', '1TB'] }],
  ['8298492675', { query: 'DJI Neo 드론', required: ['DJI', 'Neo'] }],
  ['9602303293', { query: 'GoPro HERO13 Black 크리에이터 에디션', required: ['GoPro', 'HERO13', '크리에이터'] }],
]);

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const selectedIds = new Set(data.selected.map((item) => String(item.productId)));
const recovered = [];
const rejected = [];
for (const item of data.rejected) {
  const id = String(item.productId || '');
  const override = approved.get(id);
  if (!override || selectedIds.has(id)) {
    rejected.push(item);
    continue;
  }
  const { reason, ...candidate } = item;
  recovered.push({ ...candidate, ...override, forbidden: [] });
  selectedIds.add(id);
}
for (const [id] of approved) {
  if (!selectedIds.has(id)) throw new Error(`Approved API candidate not found: ${id}`);
}
data.selected.push(...recovered);
data.selected = data.selected.map((item, index) => ({ ...item, order: index + 1 }));
data.rejected = rejected;
data.selectedCount = data.selected.length;
data.approvedRecoveryAt = new Date().toISOString();
fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Recovered ${recovered.length} reviewed API candidates; selected=${data.selected.length}.`);
