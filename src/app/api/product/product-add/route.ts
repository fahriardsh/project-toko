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

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
        
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00`;
  }
    
  let client;

  try {
    client = await pool.connect();
    const { name, variant, purchaseprice, sellingprice, description } = await request.json();
    const date = new Date();
    const formattedDate = formatDate(date);

    // 2. Retrieve the user from the database
    const query = `
    WITH inserted_product AS (
        INSERT INTO products (product_name, variant, description)
        VALUES ($1, $2, $3)
        RETURNING id
    )
    INSERT INTO product_prices (product_id, purchase, selling, update_time)
    VALUES ((SELECT id FROM inserted_product), $4, $5, $6);
    `
    const result = await client.query(query, [name, variant, description, Number(purchaseprice), Number(sellingprice), formattedDate]);
    // const product = result.rows[0];

    // if (!product) {
    //   return NextResponse.json(
    //     { error: "Missing data" },
    //     { status: 401 }
    //   );
    // }

    console.log(result.rows[0])

    // 5. Return a success response
    return NextResponse.json({ message: "Add product successful" });
  } catch (error: any) {
    console.error("Add product error:", error);
    return NextResponse.json(
      { error: "Add product failed", details: error.message },
      { status: 500 }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}