const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://etcgahcjrqiqhtmmqorj.supabase.co';
const supabaseAnonKey = 'sb_publishable_nXrvZccyQTrhaN7qWTChWw_H0CjFCfw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  try {
    const dataPath = path.join(__dirname, 'src', 'app', 'data.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const posts = JSON.parse(rawData);

    console.log(`Found ${posts.length} posts to seed...`);

    const { data, error } = await supabase.from('posts').select('id').limit(1);
    
    if (error) {
      console.error('Error accessing posts table (maybe it does not exist?):', error);
      return;
    }

    for (const post of posts) {
      const { error: insertError } = await supabase.from('posts').upsert({
        id: post.id,
        title: post.title,
        category: post.category,
        subCategory: post.subCategory,
        content: post.content,
        imageUrl: post.imageUrl,
        additionalImages: post.additionalImages,
        hashtags: post.hashtags,
        coupangLink: post.coupangLink,
        coupangIframe: post.coupangIframe,
        price: post.price
      });

      if (insertError) {
        console.error(`Failed to insert post ${post.id}:`, insertError);
      } else {
        console.log(`Successfully inserted ${post.id}`);
      }
    }
    console.log('Seeding finished.');
  } catch (err) {
    console.error('Script error:', err);
  }
}

seed();
