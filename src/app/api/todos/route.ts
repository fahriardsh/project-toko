import { NextResponse } from 'next/server';
// import client from '@/lib/db'; // Adjust this path if needed

// export async function GET() {
//     try {
//         await client.query('SELECT 1'); // A simple query to check connection
//         return NextResponse.json({ success: true, message: 'Database connection successful!' });
//     } catch (error: any) {
//         console.error('Database connection test failed:', error);
//         return NextResponse.json({ success: false, message: 'Database connection test failed!', error: error.message }, { status: 500 });
//     }
// }

import { Pool } from 'pg';

// Ensure type safety for environment variables
if (!process.env.POSTGRES_URL) {
    console.error("POSTGRES_URL environment variable is not set.");
}

// Configuration object for the connection
const poolConfig = {
    connectionString: process.env.POSTGRES_URL, // Use the environment variable!
    ssl: {
        rejectUnauthorized: false // Required for Neon's SSL, but review security implications
    },
};

// One connection pool for the entire module
const pool = new Pool(poolConfig);

export async function GET() {
    let client;
    try {
        client = await pool.connect(); // Get a client from the pool
        const result = await client.query('SELECT * FROM users');
        return NextResponse.json({ users: result.rows });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    } finally {
        if (client) {
            client.release(); // Ensure the client is always released
        }
    }
}

// export async function GET() {
//   try {
//     const result = await client.query('SELECT * FROM users');

//     console.log(result)
//     return NextResponse.json({ users: result.rows });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { content } = await request.json();

//     if (!content || typeof content !== 'string' || content.trim() === "") {
//       return NextResponse.json({ error: 'Content is required and must be a non-empty string' }, { status: 400 });
//     }

//     console.log(content)

//     const result = await client.query(
//       'INSERT INTO users (content) VALUES ($1) RETURNING *',
//       [content]
//     );

//     return NextResponse.json({ newTodo: result.rows[0] }, { status: 201 }); // 201 Created
//   } catch (error) {
//     console.error('Error creating todo:', error);
//     return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
//   }
// }