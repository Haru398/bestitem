"use client";

import { useMemo, useState } from "react";
import { CATEGORIES } from "../../lib/categories";
import type { ArticleCardData } from "./ArticleCard";
import ArticleCard from "./ArticleCard";
import styles from "../site.module.css";

export default function ArticleArchive({ posts }: { posts: ArticleCardData[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ko");
    return posts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category;
      const matchesQuery =
        !normalized ||
        `${post.title} ${post.description}`.toLocaleLowerCase("ko").includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <>
      <div className={styles.controls}>
        <input
          className={styles.searchInput}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="제품명이나 궁금한 점을 검색하세요"
          aria-label="가이드 검색"
        />
        <select
          className={styles.select}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="카테고리 선택"
        >
          <option value="all">전체 카테고리</option>
          {CATEGORIES.map((item) => (
            <option value={item.slug} key={item.slug}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.resultCount}>총 {filtered.length}개의 구매 가이드</div>
      <div className={styles.cardGrid}>
        {filtered.length ? (
          filtered.map((post) => <ArticleCard post={post} key={post.slug} />)
        ) : (
          <div className={styles.empty}>조건에 맞는 가이드가 없습니다.</div>
        )}
      </div>
    </>
  );
}
