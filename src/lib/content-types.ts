export type ContentStatus = "draft" | "legacy" | "reviewed" | "hidden";

export type ContentSection = {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

export type EditorialInfo = {
  status: ContentStatus;
  basis: string;
  lastChecked?: string;
  caution?: string;
};

export type AffiliateInfo = {
  url?: string;
  html?: string;
};

export type BuyingVerdict = {
  oneLine: string;
  bestFor: string[];
  notFor: string[];
  checkBeforeBuy: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type GuideSource = {
  title: string;
  publisher: string;
  url: string;
  sourceType: "manufacturer-spec" | "manufacturer-support" | "official-standard" | "public-agency";
  checkedAt: string;
};

export type GuideMedia = {
  path: string;
  alt: string;
  caption: string;
  creator: string;
  usageBasis: "original" | "licensed-manufacturer" | "authorized-affiliate";
  sourceUrl?: string;
  licenseUrl?: string;
};

export type PostContent = {
  kind: "post";
  slug: string;
  category: string;
  title: string;
  description: string;
  productName?: string;
  heroImage: string;
  publishedAt: string;
  updatedAt: string;
  indexable: boolean;
  searchIntent?: string;
  targetQuery?: string;
  editorial: EditorialInfo;
  verdict?: BuyingVerdict;
  intro: string;
  sections: ContentSection[];
  conclusion: string;
  faq?: FAQItem[];
  affiliate: AffiliateInfo;
};

export type GuideContent = {
  kind: "guide";
  slug: string;
  category: string;
  title: string;
  description: string;
  heroImage?: string;
  heroImageAlt?: string;
  topicCluster?: string;
  publishedAt: string;
  updatedAt: string;
  indexable: boolean;
  searchIntent?: string;
  targetQuery?: string;
  editorial: EditorialInfo;
  content: string;
  related: string[];
  sources?: GuideSource[];
  media?: GuideMedia[];
};

export type SiteContent = PostContent | GuideContent;
