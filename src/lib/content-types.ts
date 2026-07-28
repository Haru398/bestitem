export type ContentStatus = "draft" | "legacy" | "reviewed" | "hidden";

export type ContentSection = {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
};

export type EditorialInfo = {
  status: ContentStatus;
  basis: string;
  lastChecked?: string;
  caution?: string;
};

export type AffiliateInfo = {
  url?: string;
  /** New posts use an API-generated deep-link CTA; a legacy widget is optional. */
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
  sourceType:
    | "manufacturer"
    | "manufacturer-product"
    | "manufacturer-manual"
    | "manufacturer-spec"
    | "manufacturer-support"
    | "official-standard"
    | "public-agency"
    | "authorized-affiliate"
    | "retailer";
  checkedAt: string;
};

export type GuideMedia = {
  path: string;
  alt: string;
  caption: string;
  creator: string;
  usageBasis: "original" | "licensed-manufacturer" | "authorized-affiliate";
  display?: "contain" | "detail-top" | "detail-upper" | "detail-middle" | "detail-lower" | "detail-bottom";
  placement?: string;
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
  cardImage?: string;
  heroImageAlt?: string;
  heroImageCaption?: string;
  heroImageCredit?: string;
  heroImageSourceUrl?: string;
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
  sources?: GuideSource[];
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
