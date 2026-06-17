const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://etcgahcjrqiqhtmmqorj.supabase.co';
const supabaseAnonKey = 'sb_publishable_nXrvZccyQTrhaN7qWTChWw_H0CjFCfw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function deletePost() {
  const { error } = await supabase.from('posts').delete().eq('id', '7');
  if (error) {
    console.error("Error deleting post:", error);
  } else {
    console.log("Post deleted successfully!");
  }
}

deletePost();
