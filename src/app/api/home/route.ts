import { NextResponse } from 'next/server';
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
        const result = await client.query('SELECT * FROM products');
        return NextResponse.json({ products: result.rows });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    } finally {
        if (client) {
            client.release(); // Ensure the client is always released
        }
    }
}