export type CategoryDefinition = {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
};

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: "home-appliances",
    label: "생활·계절가전",
    shortLabel: "생활가전",
    description: "에어컨, 청소기, 계절가전처럼 설치 환경과 유지비를 함께 봐야 하는 제품",
  },
  {
    slug: "digital-pc",
    label: "디지털·PC",
    shortLabel: "디지털",
    description: "호환성, 성능, 포트와 규격을 구매 전에 확인해야 하는 디지털 제품",
  },
  {
    slug: "living-kitchen",
    label: "생활·주방",
    shortLabel: "생활",
    description: "매일 쓰는 생활용품과 주방용품의 구성, 소재, 관리법을 확인합니다",
  },
  {
    slug: "food-health",
    label: "식품·건강",
    shortLabel: "식품",
    description: "용량, 원재료, 보관 조건처럼 표시 정보에서 확인할 수 있는 내용을 정리합니다",
  },
  {
    slug: "fashion-beauty",
    label: "패션·뷰티",
    shortLabel: "패션뷰티",
    description: "사이즈, 소재, 사용 조건과 개인차가 큰 선택 포인트를 짚습니다",
  },
  {
    slug: "outdoor-auto",
    label: "스포츠·자동차",
    shortLabel: "아웃도어",
    description: "야외 환경, 휴대성, 안전과 관리 조건이 중요한 제품을 다룹니다",
  },
  {
    slug: "pet-family",
    label: "반려·패밀리",
    shortLabel: "반려가족",
    description: "반려동물과 가족용품의 구성, 사용 연령과 주의사항을 확인합니다",
  },
  {
    slug: "offers",
    label: "기획전·특가",
    shortLabel: "기획전",
    description: "기간과 조건이 명확한 기획전 정보만 모아 봅니다",
  },
];

const CATEGORY_ALIASES: Record<string, string> = {
  "가전/디지털": "home-appliances",
  "가전": "home-appliances",
  "청소기": "home-appliances",
  "디지털": "digital-pc",
  "디지털/가전": "digital-pc",
  "생활용품": "living-kitchen",
  "생활/주방": "living-kitchen",
  "가구인테리어": "living-kitchen",
  "가구/인테리어": "living-kitchen",
  "식품": "food-health",
  "건강": "food-health",
  "건강식품": "food-health",
  "헬스/건강식품": "food-health",
  "패션": "fashion-beauty",
  "패션잡화": "fashion-beauty",
  "패션/잡화": "fashion-beauty",
  "패션/의류": "fashion-beauty",
  "패션/뷰티": "fashion-beauty",
  "뷰티": "fashion-beauty",
  "뷰티/화장품": "fashion-beauty",
  "스포츠/레저": "outdoor-auto",
  "자동차용품": "outdoor-auto",
  "자동차/바이크": "outdoor-auto",
  "반려동물": "pet-family",
  "반려동물용품": "pet-family",
  "출산/유아동": "pet-family",
  "홈/유아": "pet-family",
  "이벤트/특가": "offers",
  "리뷰": "living-kitchen",
};

export function normalizeCategory(value: string): string {
  if (CATEGORIES.some((category) => category.slug === value)) return value;
  return CATEGORY_ALIASES[value] ?? "living-kitchen";
}

export function getCategory(slug: string): CategoryDefinition {
  return CATEGORIES.find((category) => category.slug === slug) ?? CATEGORIES[2];
}
