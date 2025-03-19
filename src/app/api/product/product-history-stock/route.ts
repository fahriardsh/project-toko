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

export async function GET(request: Request) {
    let client;

    try {
        client = await pool.connect();
        const { searchParams } = new URL(request.url);

        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const query = `
            SELECT
                *
            FROM
                product_inventory
            WHERE 
                product_id = $1
        `;

        const result = await client.query(query, [id]); // Replace with your query

        const products = result.rows;

        return NextResponse.json({ products,  message: "Product successfully fetched" });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    } finally {
        if (client) {
            client.release(); // Ensure the client is always released
        }
    }
}