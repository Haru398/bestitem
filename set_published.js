const db = require('./db_v2');

async function main() {
  const postId = 'POST-ZENOBEN';
  await db.post.setStatus(postId, 'PUBLISHED');
  console.log(`✅ ${postId} status changed to PUBLISHED`);
}

main().catch(console.error);
