-- CreateTable
CREATE TABLE "posts_v2" (
    "postId" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'WAIT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    "thumbnail" TEXT NOT NULL DEFAULT '',
    "intro" TEXT NOT NULL DEFAULT '',
    "outro" TEXT NOT NULL DEFAULT '',
    "coupangLink" TEXT NOT NULL DEFAULT '',
    "coupangHtml" TEXT NOT NULL DEFAULT '',
    "errorInfo" TEXT NOT NULL DEFAULT '',
    "lastFailedStatus" TEXT NOT NULL DEFAULT '',
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "post_sections" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" TEXT NOT NULL,
    "sectionOrder" INTEGER NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "imageAlt" TEXT NOT NULL DEFAULT '',
    "text" TEXT NOT NULL DEFAULT '',
    "qualityScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "post_sections_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts_v2" ("postId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_versions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "snapshot" TEXT NOT NULL,
    "changeNote" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "post_versions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts_v2" ("postId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "telegram_state" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "lastProcessedUpdateId" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "currentPostId" TEXT NOT NULL DEFAULT '',
    "lastViewedPostId" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'idle',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "post_locks" (
    "postId" TEXT NOT NULL PRIMARY KEY,
    "lockedBy" TEXT NOT NULL,
    "lockedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "post_locks_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts_v2" ("postId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "post_sections_postId_sectionOrder_key" ON "post_sections"("postId", "sectionOrder");
