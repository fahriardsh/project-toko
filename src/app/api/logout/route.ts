import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('user'); // Delete the 'user' cookie
    return NextResponse.json({ message: 'Logout successful' });
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed', details: error.message }, { status: 500 });
  }
}