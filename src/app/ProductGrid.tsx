"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import InlineEditor from "./components/InlineEditor";

type Post = {
  id: string;
  category: string;
  subCategory?: string;
  title: string;
  content: string;
  price?: string;
  imageUrl: string;
  coupangIframe?: string;
  views?: number;
};

export default function ProductGrid({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSubCategory, setSelectedSubCategory] = useState("전체");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
      setSelectedSubCategory("전체");
    } else {
      setSelectedCategory("전체");
      setSelectedSubCategory("전체");
    }
  }, [searchParams]);

  const mappedPosts = useMemo(() => {
    const CATEGORY_MAP: Record<string, string> = {
      "식품": "식품/건강",
      "건강": "식품/건강",
      "헬스/건강식품": "식품/건강",
      "건강식품": "식품/건강",
      "반려동물": "반려동물",
      "반려동물용품": "반려동물",
      "디지털": "가전/디지털",
      "가전": "가전/디지털",
      "가전/디지털": "가전/디지털",
      "청소기": "가전/디지털",
      "패션": "패션/뷰티",
      "뷰티": "패션/뷰티",
      "패션잡화": "패션/뷰티",
      "뷰티/화장품": "패션/뷰티",
      "패션/의류": "패션/뷰티",
      "가구인테리어": "홈/유아",
      "출산/유아동": "홈/유아",
    };
    return posts.map(p => ({
      ...p,
      category: CATEGORY_MAP[p.category] || p.category
    }));
  }, [posts]);

  // Get unique main categories from data
  const categories = ["전체", "이벤트/특가", ...Array.from(new Set(mappedPosts.map(p => p.category))).filter(c => c !== "이벤트/특가")];

  // Get unique sub categories for the selected main category
  const subCategories = useMemo(() => {
    if (selectedCategory === "전체") return [];
    const subs = new Set(mappedPosts.filter(p => p.category === selectedCategory && p.subCategory).map(p => p.subCategory));
    return ["전체", ...Array.from(subs)] as string[];
  }, [mappedPosts, selectedCategory]);

  // When main category changes, reset sub category to "전체"
  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubCategory("전체");
    
    // URL 업데이트 (히스토리 스택 추가)
    if (cat === "전체") {
      router.push('/');
    } else {
      router.push(`/?category=${encodeURIComponent(cat)}`);
    }
  };

  const filteredAndSortedPosts = useMemo(() => {
    // 1. Filter
    let filtered = mappedPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory;
      const matchesSubCategory = selectedSubCategory === "전체" || post.subCategory === selectedSubCategory;
      return matchesSearch && matchesCategory && matchesSubCategory;
    });

    return filtered;
  }, [mappedPosts, searchQuery, selectedCategory, selectedSubCategory]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedSubCategory]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className={styles.controlsContainer}>
        {isAdmin && (
          <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <button 
              onClick={() => setIsCreating(true)}
              style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              + 새 글 쓰기
            </button>
          </div>
        )}

        {/* Main Category Filters */}
        <div className={styles.categoryFilters}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilter : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub Category Filters */}
        {subCategories.length > 1 && (
          <div className={styles.subCategoryFilters}>
            {subCategories.map(subCat => (
              <button 
                key={subCat} 
                className={`${styles.subFilterBtn} ${selectedSubCategory === subCat ? styles.activeSubFilter : ''}`}
                onClick={() => setSelectedSubCategory(subCat)}
              >
                {subCat}
              </button>
            ))}
          </div>
        )}

        {/* Search and Sort */}
        <div className={styles.searchSortContainer}>
          <input 
            type="text" 
            placeholder="검색어를 입력하세요 (예: 모니터)" 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {paginatedPosts.length === 0 ? (
          <div className={styles.emptyState}>검색 결과가 없습니다.</div>
        ) : (
          paginatedPosts.map((post) => {
            const views = post.views || 0;
            return (
              <article key={post.id} className={styles.card}>
                {post.imageUrl ? (
                  <div 
                    className={styles.imagePlaceholder}
                    style={{ 
                      backgroundImage: `url(${post.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                ) : post.coupangIframe ? (
                  <div 
                    className={styles.imagePlaceholder}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor: '#fff' }}
                    dangerouslySetInnerHTML={{ __html: post.coupangIframe }}
                  ></div>
                ) : (
                  <div className={styles.imagePlaceholder}></div>
                )}
                <div className={styles.cardContent}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className={styles.category}>{post.category}</span>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {isAdmin && (
                        <button 
                          onClick={(e) => { e.preventDefault(); setEditingPost(post); }}
                          style={{ padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}
                        >수정</button>
                      )}
                    </div>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.content.substring(0, 80)}...</p>
                  <Link href={`/post/${post.id}`} className={styles.readMore}>
                    {post.category === "이벤트/특가" ? "기획전 보러가기 👉" : "솔직 리뷰 보러가기 👉"}
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn} 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            이전
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                className={`${styles.pageNumBtn} ${currentPage === pageNum ? styles.activePage : ''}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button 
            className={styles.pageBtn} 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            다음
          </button>
        </div>
      )}

      {(editingPost || isCreating) && (
        <InlineEditor 
          post={editingPost}
          onSave={() => {
            setEditingPost(null);
            setIsCreating(false);
          }}
          onCancel={() => {
            setEditingPost(null);
            setIsCreating(false);
          }}
        />
      )}
    </>
  );
}
