"use client";

import { useState } from "react";
import styles from "./InlineEditor.module.css";
import { useRouter } from "next/navigation";

export default function InlineEditor({ post, onSave, onCancel }: { post?: any, onSave: () => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    id: post?.id || "",
    title: post?.title || "",
    category: post?.category || "리뷰",
    content: post?.content || "",
    imageUrl: post?.imageUrl || "",
    additionalImages: post?.additionalImages || [],
  });
  const [file, setFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    let finalImageUrl = formData.imageUrl;
    let finalAdditionalImages = [...formData.additionalImages];

    const uploadFile = async (f: File) => {
      const uploadData = new FormData();
      uploadData.append('file', f);
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
      if (res.ok) {
        const { url } = await res.json();
        return url;
      }
      return null;
    };

    if (file) {
      const url = await uploadFile(file);
      if (url) finalImageUrl = url;
    }

    for (let i = 0; i < 4; i++) {
      if (additionalFiles[i]) {
        const url = await uploadFile(additionalFiles[i] as File);
        if (url) finalAdditionalImages[i] = url;
      }
    }

    const postData = {
      ...formData,
      imageUrl: finalImageUrl,
      additionalImages: finalAdditionalImages.filter(Boolean),
    };

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });

    if (res.ok) {
      alert("저장되었습니다!");
      onSave();
      router.refresh();
    } else {
      alert("저장 실패!");
    }
    setIsSaving(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{post ? "글 수정" : "새 글 쓰기"}</h2>
        
        <label>제목</label>
        <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={styles.input} />

        <label>카테고리</label>
        <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={styles.input} />

        <label>내용</label>
        <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className={styles.textarea} />

        <label>메인 사진 업로드</label>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className={styles.input} />

        <label>추가 사진 업로드 (최대 4장)</label>
        {[0, 1, 2, 3].map(i => (
          <input 
            key={i} 
            type="file" 
            accept="image/*" 
            onChange={e => {
              const newFiles = [...additionalFiles];
              newFiles[i] = e.target.files?.[0] || null;
              setAdditionalFiles(newFiles);
            }} 
            className={styles.input} 
            style={{ marginBottom: '5px' }}
          />
        ))}

        <div className={styles.buttons}>
          <button onClick={onCancel} className={styles.cancelBtn}>취소</button>
          <button onClick={handleSave} className={styles.saveBtn} disabled={isSaving}>
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
