import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  
  // Set a very simple password for the admin login
  if (password === 'admin1234') {
    const cookieStore = await cookies();
    cookieStore.set('isAdmin', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ success: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('isAdmin');
  return NextResponse.json({ success: true });
}
