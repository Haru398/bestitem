const Database = require('better-sqlite3');
const { createClient } = require('@supabase/supabase-js');

const db = new Database('dev.db');
const supabase = createClient('https://etcgahcjrqiqhtmmqorj.supabase.co', 'sb_publishable_nXrvZccyQTrhaN7qWTChWw_H0CjFCfw');

async function main() {
  console.log('Initializing SQLite schema...');
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      category TEXT,
      subCategory TEXT,
      title TEXT,
      content TEXT,
      price TEXT,
      imageUrl TEXT,
      coupangIframe TEXT,
      views INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Fetching posts from Supabase...');
  const { data: posts, error } = await supabase.from('posts').select('*');
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }
  
  console.log(`Found ${posts.length} posts. Inserting into SQLite...`);
  const insert = db.prepare(`
    INSERT OR REPLACE INTO posts 
    (id, category, subCategory, title, content, price, imageUrl, coupangIframe, views, createdAt)
    VALUES (@id, @category, @subCategory, @title, @content, @price, @imageUrl, @coupangIframe, @views, @createdAt)
  `);

  const insertMany = db.transaction((postsToInsert) => {
    for (const post of postsToInsert) {
      insert.run({
        id: post.id.toString(),
        category: post.category,
        subCategory: post.subCategory || null,
        title: post.title,
        content: post.content,
        price: post.price || null,
        imageUrl: post.imageUrl || '',
        coupangIframe: post.coupangIframe || null,
        views: post.views || 0,
        createdAt: post.created_at || new Date().toISOString()
      });
    }
  });

  insertMany(posts);
  console.log('Migration completed successfully.');
}

main().catch(console.error);
