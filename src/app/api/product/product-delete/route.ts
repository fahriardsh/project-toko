import { NextResponse } from 'next/server';
import { Pool } from 'pg'; // Correct import

// Connection pool
const poolConfig = {
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon's SSL
  },
};
const pool = new Pool(poolConfig);

export async function POST(request: Request) {

  let client;

  try {
    client = await pool.connect();
    const { id } = await request.json();

    const query = `
        DELETE FROM products
        WHERE id = $1
    `
    const result = await client.query(query, [id]);
    console.log(result)

    return NextResponse.json({ message: "Product successfully deleted" });

  } catch (error: any) {

    return NextResponse.json(
      { 
        error: "Delete product failed", 
        details: error.message 
      },
      { status: 500 }
    );

  } finally {

    if (client) {
      client.release();
    }
    
  }
}