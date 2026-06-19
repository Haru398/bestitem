'use strict';
/**
 * ITEM.MONSTER V2 - DB 헬퍼 (db_v2.js)
 * Prisma Client를 이용한 6개 테이블 CRUD 헬퍼
 *
 * 사용:
 *   const db = require('./db_v2');
 *   const post = await db.post.create({ postId: 'POST-001', ... });
 */

const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

// Prisma 7 SQLite 연결 (url 방식)
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });


// ─────────────────────────────────────────────────────────────
// postId 자동 생성 (POST-001 ~ POST-999)
// ─────────────────────────────────────────────────────────────
async function generatePostId() {
  const last = await prisma.post.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { postId: true },
  });
  if (!last) return 'POST-001';
  const num = parseInt(last.postId.replace('POST-', ''), 10) || 0;
  return `POST-${String(num + 1).padStart(3, '0')}`;
}

// ─────────────────────────────────────────────────────────────
// POST CRUD
// ─────────────────────────────────────────────────────────────
const post = {
  /** 새 Post 생성 (COLLECTING 상태) */
  async create(data = {}) {
    const postId = data.postId || await generatePostId();
    return prisma.post.create({
      data: {
        postId,
        status: 'COLLECTING',
        category: data.category || '',
        coupangLink: data.coupangLink || '',
        coupangHtml: data.coupangHtml || '',
      },
    });
  },

  /** postId로 Post + Sections 전체 조회 */
  async get(postId) {
    return prisma.post.findUnique({
      where: { postId },
      include: {
        sections: { orderBy: { sectionOrder: 'asc' } },
      },
    });
  },

  /** 상태 변경 */
  async setStatus(postId, status, extra = {}) {
    return prisma.post.update({
      where: { postId },
      data: { status, ...extra },
    });
  },

  /** ERROR 상태 진입 */
  async setError(postId, currentStatus, errorMessage) {
    return prisma.post.update({
      where: { postId },
      data: {
        status: 'ERROR',
        errorInfo: errorMessage,
        lastFailedStatus: currentStatus,
      },
    });
  },

  /** ERROR 클리어 (재시도 전) */
  async clearError(postId) {
    const p = await prisma.post.findUnique({ where: { postId } });
    const retryStatus = p?.lastFailedStatus || 'WRITING';
    return prisma.post.update({
      where: { postId },
      data: { status: retryStatus, errorInfo: '', lastFailedStatus: '' },
    });
  },

  /** 특정 블록만 업데이트 */
  async updateBlock(postId, field, value) {
    const allowed = ['title', 'summary', 'intro', 'outro', 'thumbnail', 'category'];
    if (!allowed.includes(field)) throw new Error(`허용되지 않은 필드: ${field}`);
    await prisma.post.update({
      where: { postId },
      data: { [field]: value },
    });
    return version.bump(postId, `${field} 수정`);
  },

  /** 코다리 작성 완료 후 전체 저장 (save = LOCAL_UPLOADED) */
  async save(postId, data) {
    const { title, summary, intro, outro, thumbnail, sections } = data;

    await prisma.post.update({
      where: { postId },
      data: { title, summary, intro, outro, thumbnail, status: 'LOCAL_UPLOADED' },
    });

    // 기존 섹션 삭제 후 재삽입
    await prisma.postSection.deleteMany({ where: { postId } });
    for (const s of sections) {
      await prisma.postSection.create({
        data: {
          postId,
          sectionOrder: s.sectionOrder,
          image: s.image || '',
          imageAlt: s.imageAlt || '',
          text: s.text || '',
          qualityScore: s.qualityScore || 0,
        },
      });
    }

    // 버전 스냅샷 저장
    return version.bump(postId, 'v1 최초 저장');
  },

  /** 조회수 증가 */
  async addView(postId) {
    return prisma.post.update({
      where: { postId },
      data: { views: { increment: 1 } },
    });
  },
};

// ─────────────────────────────────────────────────────────────
// SECTION CRUD (블록 단위 수정)
// ─────────────────────────────────────────────────────────────
const section = {
  /** 특정 섹션 텍스트만 수정 */
  async updateText(postId, sectionOrder, text) {
    await prisma.postSection.update({
      where: { postId_sectionOrder: { postId, sectionOrder } },
      data: { text },
    });
    return version.bump(postId, `section${sectionOrder} 텍스트 수정`);
  },

  /** 특정 섹션 이미지 교체 */
  async updateImage(postId, sectionOrder, image, imageAlt, qualityScore) {
    return prisma.postSection.update({
      where: { postId_sectionOrder: { postId, sectionOrder } },
      data: { image, imageAlt: imageAlt || '', qualityScore: qualityScore || 0 },
    });
  },

  /** 특정 섹션 전체(이미지+텍스트) 수정 */
  async updateFull(postId, sectionOrder, data) {
    await prisma.postSection.update({
      where: { postId_sectionOrder: { postId, sectionOrder } },
      data: {
        image: data.image,
        imageAlt: data.imageAlt || '',
        text: data.text,
        qualityScore: data.qualityScore || 0,
      },
    });
    return version.bump(postId, `section${sectionOrder} 이미지+텍스트 수정`);
  },

  /** 모든 섹션 조회 */
  async list(postId) {
    return prisma.postSection.findMany({
      where: { postId },
      orderBy: { sectionOrder: 'asc' },
    });
  },
};

// ─────────────────────────────────────────────────────────────
// VERSION 관리
// ─────────────────────────────────────────────────────────────
const version = {
  /** 버전 +1 + 스냅샷 저장 */
  async bump(postId, changeNote) {
    const current = await prisma.post.findUnique({
      where: { postId },
      include: { sections: { orderBy: { sectionOrder: 'asc' } } },
    });
    if (!current) throw new Error(`Post ${postId} 없음`);

    const newVersion = current.version + 1;
    const snapshot = JSON.stringify({ post: current, sections: current.sections });

    await prisma.postVersion.create({
      data: { postId, version: newVersion, snapshot, changeNote: `v${newVersion} ${changeNote}` },
    });

    return prisma.post.update({
      where: { postId },
      data: { version: newVersion },
    });
  },

  /** 특정 버전으로 복구 */
  async restore(postId, targetVersion) {
    const v = await prisma.postVersion.findFirst({
      where: { postId, version: targetVersion },
    });
    if (!v) throw new Error(`v${targetVersion} 히스토리가 없습니다`);

    const snap = JSON.parse(v.snapshot);
    const { post: p, sections: s } = snap;

    // Post 복원
    await prisma.post.update({
      where: { postId },
      data: {
        title: p.title, summary: p.summary, intro: p.intro,
        outro: p.outro, thumbnail: p.thumbnail, category: p.category,
        status: 'REVIEW',
      },
    });

    // Sections 복원
    await prisma.postSection.deleteMany({ where: { postId } });
    for (const sec of s) {
      await prisma.postSection.create({
        data: {
          postId, sectionOrder: sec.sectionOrder,
          image: sec.image, imageAlt: sec.imageAlt,
          text: sec.text, qualityScore: sec.qualityScore || 0,
        },
      });
    }

    return version.bump(postId, `v${targetVersion}으로 복구`);
  },

  /** 버전 목록 조회 */
  async list(postId) {
    return prisma.postVersion.findMany({
      where: { postId },
      orderBy: { version: 'asc' },
      select: { version: true, changeNote: true, createdAt: true },
    });
  },
};

// ─────────────────────────────────────────────────────────────
// TELEGRAM STATE (중복 처리 방지)
// ─────────────────────────────────────────────────────────────
const telegram = {
  /** 마지막 처리 update_id 조회 */
  async getOffset() {
    const s = await prisma.telegramState.findUnique({ where: { id: 1 } });
    return s?.lastProcessedUpdateId || 0;
  },

  /** 처리 완료 후 update_id 저장 */
  async setOffset(updateId) {
    return prisma.telegramState.upsert({
      where: { id: 1 },
      update: { lastProcessedUpdateId: updateId },
      create: { id: 1, lastProcessedUpdateId: updateId },
    });
  },
};

// ─────────────────────────────────────────────────────────────
// USER SESSION (작업 세션 추적)
// ─────────────────────────────────────────────────────────────
const session = {
  /** 세션 조회 (없으면 null) */
  async get(userId) {
    return prisma.userSession.findUnique({ where: { userId } });
  },

  /** 세션 업데이트 */
  async set(userId, data) {
    return prisma.userSession.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  },

  /** currentPostId 설정 */
  async setCurrentPost(userId, postId, status = 'creating') {
    return session.set(userId, { currentPostId: postId, status });
  },

  /** 현재 작업 중인 postId 반환 */
  async getCurrentPostId(userId) {
    const s = await session.get(userId);
    return s?.currentPostId || null;
  },
};

// ─────────────────────────────────────────────────────────────
// POST LOCK (동시 수정 충돌 방지)
// ─────────────────────────────────────────────────────────────
const lock = {
  /** Lock 획득 시도. 성공: true, 실패(이미 locked): false */
  async acquire(postId, userId) {
    // 30분 이상 된 Lock은 자동 만료
    const expiry = new Date(Date.now() - 30 * 60 * 1000);
    await prisma.postLock.deleteMany({
      where: { postId, lockedAt: { lt: expiry } },
    });

    const existing = await prisma.postLock.findUnique({ where: { postId } });
    if (existing) return false;

    try {
      await prisma.postLock.create({ data: { postId, lockedBy: userId } });
      return true;
    } catch {
      return false;
    }
  },

  /** Lock 해제 */
  async release(postId) {
    return prisma.postLock.deleteMany({ where: { postId } });
  },

  /** Lock 보유자 확인 */
  async check(postId) {
    return prisma.postLock.findUnique({ where: { postId } });
  },
};

// ─────────────────────────────────────────────────────────────
// 연결 종료
// ─────────────────────────────────────────────────────────────
async function disconnect() {
  return prisma.$disconnect();
}

module.exports = { post, section, version, telegram, session, lock, disconnect, prisma, generatePostId };
