const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = 'D:\\서버구축폴더\\bestitem';
const outDir = path.join(projectDir, 'out');

function run(cmd, opts = {}) {
  console.log('>>> ' + cmd);
  const result = execSync(cmd, { cwd: projectDir, encoding: 'utf8', ...opts });
  if (result) console.log(result.trim());
  return result;
}

try {
  // 1. Save current branch
  const currentBranch = run('git rev-parse --abbrev-ref HEAD').trim();
  console.log('Current branch:', currentBranch);

  // 2. Checkout main
  run('git checkout main');

  // 3. Copy out contents to root
  // First clean old static files (keep hidden dirs and key files)
  const rootFiles = fs.readdirSync(projectDir);
  for (const f of rootFiles) {
    if (f === '.git' || f === 'out' || f === 'node_modules' || f === 'src' || 
        f === 'public' || f === '.next' || f === '.env' || f === '.env.local' ||
        f === '.gitignore' || f === 'dev.db' || f.endsWith('.js') || f.endsWith('.py') ||
        f.endsWith('.json') || f.endsWith('.html') || f.endsWith('.bat') || f.endsWith('.md') ||
        f.endsWith('.ts') || f.endsWith('.mjs') || f.endsWith('.txt') || f.endsWith('.log') ||
        f === 'prisma' || f === '.netlify' || f === '.vercel' || f.endsWith('.jpg') || 
        f.endsWith('.png') || f.endsWith('.svg')) {
      continue;
    }
  }

  // Copy out/* to root
  const outContents = fs.readdirSync(outDir);
  for (const item of outContents) {
    const src = path.join(outDir, item);
    const dst = path.join(projectDir, item);
    if (fs.statSync(src).isDirectory()) {
      execSync(`xcopy /s /y /e /q "${src}" "${dst}\\"`, { encoding: 'utf8' });
    } else {
      fs.copyFileSync(src, dst);
    }
    console.log('Copied: ' + item);
  }

  // 4. Add .nojekyll so GitHub Pages serves _next correctly
  fs.writeFileSync(path.join(projectDir, '.nojekyll'), '');

  // 5. Git add, commit, push
  run('git add -A');
  run('git commit -m "deploy: add baby vest, event post, link card fix"');
  run('git push origin main');

  console.log('\n✅ 배포 완료! item.monster 에 반영 중...');
  console.log('GitHub Pages 적용까지 최대 2분 소요됩니다.');

  // 6. Go back to source branch
  run(`git checkout ${currentBranch}`);

} catch(e) {
  console.error('Error:', e.message);
  process.exit(1);
}
