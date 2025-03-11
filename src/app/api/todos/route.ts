import { NextResponse } from 'next/server';
import client from '@/lib/db'; // Adjust this path if needed

// export async function GET() {
//     try {
//         await client.query('SELECT 1'); // A simple query to check connection
//         return NextResponse.json({ success: true, message: 'Database connection successful!' });
//     } catch (error: any) {
//         console.error('Database connection test failed:', error);
//         return NextResponse.json({ success: false, message: 'Database connection test failed!', error: error.message }, { status: 500 });
//     }
// }

export async function GET() {
  try {
    const result = await client.query('SELECT * FROM users');
    return NextResponse.json({ users: result.rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== 'string' || content.trim() === "") {
      return NextResponse.json({ error: 'Content is required and must be a non-empty string' }, { status: 400 });
    }

    const result = await client.query(
      'INSERT INTO users (content) VALUES ($1) RETURNING *',
      [content]
    );

    return NextResponse.json({ newTodo: result.rows[0] }, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}