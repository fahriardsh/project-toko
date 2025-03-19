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

        // const query = `
        // SELECT
        //     pr.id AS product_id,
        //     pr.product_name,
        //     pr.variant,
        //     pr.description
        // FROM
        //     products pr
        // WHERE pr.id = $1
        // `;

        const query = `
            SELECT
                pr.id AS product_id,
                pr.product_name,
                pr.variant,
                pr.description,
                COALESCE(SUM(pi.quantity_change), 0) AS current_quantity,
                MAX(pi.transaction_date) AS last_inventory_update,
                pp.purchase AS latest_purchase_price,
                pp.update_time AS latest_price_update_time
            FROM
                products pr
            LEFT JOIN
                product_inventory pi ON pr.id = pi.product_id
            LEFT JOIN (
                SELECT
                    product_id,
                    purchase,
                    update_time,
                    ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY update_time DESC) AS rn
                FROM
                    product_prices
            ) pp ON pr.id = pp.product_id AND pp.rn = 1
            WHERE pr.id = $1
            GROUP BY
                pr.id, pr.product_name, pr.variant, pr.description, pp.purchase, pp.update_time
            ORDER BY
                pr.id;
        `
        
        const result = await client.query(query, [id]); // Replace with your query

        const product = result.rows[0];

        return NextResponse.json({ product,  message: "Product successfully fetched" });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    } finally {
        if (client) {
            client.release(); // Ensure the client is always released
        }
    }
}