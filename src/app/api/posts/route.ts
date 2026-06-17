import db from "../../../lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.get('isAdmin')) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const id = data.id || uuidv4();
    
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO posts 
      (id, category, subCategory, title, content, price, imageUrl, additionalImages, coupangIframe, views, createdAt)
      VALUES (@id, @category, @subCategory, @title, @content, @price, @imageUrl, @additionalImages, @coupangIframe, @views, @createdAt)
    `);

    stmt.run({
      id,
      category: data.category || '기타',
      subCategory: data.subCategory || null,
      title: data.title || '새 게시글',
      content: data.content || '',
      price: data.price || null,
      imageUrl: data.imageUrl || '',
      additionalImages: data.additionalImages ? JSON.stringify(data.additionalImages) : null,
      coupangIframe: data.coupangIframe || null,
      views: data.views || 0,
      createdAt: data.createdAt || new Date().toISOString()
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}
