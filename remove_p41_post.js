const db = require('./db_v2');

async function main() {
  await db.prisma.post.deleteMany({
    where: { postId: 'POST-001' }
  });
  console.log('Removed POST-001 from posts_v2');
  await db.disconnect();
}

main().catch(console.error);
