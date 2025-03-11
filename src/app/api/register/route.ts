import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import client from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
        }

        // 1. Hash the password
        const passwordHash = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // 2. Insert the new user into the database
        try {
            await client.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, passwordHash]);
        } catch (dbError: any) {
            // Check for unique constraint violation (username already exists)
            if (dbError.code === '23505') {
                return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
            }
            throw dbError; // Re-throw other database errors
        }


        // 3. Return a success response
        return NextResponse.json({ message: 'Registration successful' });

    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Registration failed', details: error.message }, { status: 500 });
    }
}