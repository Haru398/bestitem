import Image from "next/image";
import Link from "next/link";
import { getCategory } from "../../lib/categories";
import type { PostContent } from "../../lib/content-types";
import styles from "../site.module.css";

export type ArticleCardData = Pick<
  PostContent,
  "slug" | "category" | "title" | "description" | "heroImage" | "editorial"
>;

export default function ArticleCard({ post }: { post: ArticleCardData }) {
  const category = getCategory(post.category);
  return (
    <Link href={`/post/${post.slug}/`} className={styles.articleCard}>
      {post.heroImage ? (
        <Image
          src={post.heroImage}
          alt=""
          className={styles.cardImage}
          loading="lazy"
          width={640}
          height={400}
        />
      ) : null}
      <div className={styles.cardBody}>
        <span className={post.editorial.status === "reviewed" ? styles.tag : styles.statusTag}>
          {post.editorial.status === "reviewed" ? category.shortLabel : `${category.shortLabel} · 재검수 중`}
        </span>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span className={styles.cardCta}>구매 전 체크하기 →</span>
      </div>
    </Link>
  );
}
