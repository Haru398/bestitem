const fs = require('fs');

const pageCss = `
/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}
.pageNumbers {
  display: flex;
  gap: 0.5rem;
}
.pageBtn, .pageNumBtn {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}
.pageNumBtn {
  padding: 0.5rem 0.8rem;
}
.pageBtn:hover:not(:disabled), .pageNumBtn:hover {
  border-color: #2563eb;
  color: #2563eb;
}
.pageBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.activePage {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
`;
fs.appendFileSync('D:\\서버구축폴더\\bestitem\\src\\app\\page.module.css', pageCss);

const postCss = `
/* Mobile Text and Image Wrap Fix */
.markdownContent {
  width: 100%;
  overflow-wrap: break-word;
  word-break: keep-all;
}
.markdownContent :global(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}
.markdownContent :global(iframe) {
  max-width: 100%;
}
.markdownContent :global(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  width: 100%;
}
`;
fs.appendFileSync('D:\\서버구축폴더\\bestitem\\src\\app\\post\\post.module.css', postCss);

console.log('Appended CSS to both files');
