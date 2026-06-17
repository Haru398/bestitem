import Database from 'better-sqlite3';
import path from 'path';

// Use an absolute path to ensure it works properly inside Next.js
const dbPath = path.resolve(process.cwd(), 'dev.db');
const db = new Database(dbPath);

export default db;
