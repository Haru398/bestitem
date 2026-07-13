import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { normalizeCategory } from "./categories";
import type { GuideContent, PostContent, SiteContent } from "./content-types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readJsonDirectory<T extends SiteContent>(directory: string): T[] {
  const absolute = path.join(CONTENT_ROOT, directory);
  if (!fs.existsSync(absolute)) return [];

  return fs
    .readdirSync(absolute)
    .filter((filename) => filename.endsWith(".json"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(absolute, filename), "utf8");
      const item = JSON.parse(raw) as T;
      return { ...item, category: normalizeCategory(item.category) };
    })
    .filter((item) => item.editorial.status !== "hidden")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export const getAllPosts = cache(() => readJsonDirectory<PostContent>("posts"));
export const getAllGuides = cache(() => readJsonDirectory<GuideContent>("guides"));

export const getPost = cache((slug: string) =>
  getAllPosts().find((post) => post.slug === slug),
);

export const getGuide = cache((slug: string) =>
  getAllGuides().find((guide) => guide.slug === slug),
);

export const getPostsByCategory = cache((category: string) =>
  getAllPosts().filter((post) => post.category === category),
);

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function plainText(markdown: string): string {
  return markdown
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`>[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
