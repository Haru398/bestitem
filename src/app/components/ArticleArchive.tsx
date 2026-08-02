"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { CATEGORIES } from "../../lib/categories";
import type { ArticleCardData } from "./ArticleCard";
import ArticleCard from "./ArticleCard";
import styles from "../site.module.css";

function subscribeToLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getLocationQuery() {
  return new URLSearchParams(window.location.search).get("q") || "";
}

function getServerQuery() {
  return "";
}

export default function ArticleArchive({ posts }: { posts: ArticleCardData[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [hasTypedQuery, setHasTypedQuery] = useState(false);
  const locationQuery = useSyncExternalStore(
    subscribeToLocation,
    getLocationQuery,
    getServerQuery,
  );
  const activeQuery = hasTypedQuery ? query : locationQuery;

  const filtered = useMemo(() => {
    const terms = activeQuery
      .trim()
      .toLocaleLowerCase("ko")
      .split(/\s+/)
      .filter(Boolean);
    return posts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category;
      const categoryLabel = CATEGORIES.find((item) => item.slug === post.category)?.label || "";
      const searchableText = `${post.title} ${post.description} ${categoryLabel} ${post.category}`
        .toLocaleLowerCase("ko");
      const matchesQuery = terms.every((term) => searchableText.includes(term));
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeQuery, category]);

  const visibleCategories = CATEGORIES.filter((item) =>
    posts.some((post) => post.category === item.slug),
  );

  return (
    <>
      <div className={styles.controls}>
        <input
          id="article-search"
          className={styles.searchInput}
          type="search"
          value={activeQuery}
          onChange={(event) => {
            setHasTypedQuery(true);
            setQuery(event.target.value);
          }}
          placeholder="제품명이나 고민을 적어보세요"
          aria-label="가이드 검색"
        />
        <select
          className={styles.select}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="카테고리 선택"
        >
          <option value="all">전체 카테고리</option>
          {visibleCategories.map((item) => (
            <option value={item.slug} key={item.slug}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.resultCount}>{filtered.length}개의 글을 찾았어요</div>
      <div className={styles.cardGrid}>
        {filtered.length ? (
          filtered.map((post) => <ArticleCard post={post} key={post.slug} />)
        ) : (
          <div className={styles.empty}>아직 이 내용으로 쓴 글이 없어요.</div>
        )}
      </div>
    </>
  );
}
