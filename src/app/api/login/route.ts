import { NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';
// import client from '@/lib/db'; // Adjust path as needed
import { cookies } from 'next/headers'

// import { getIronSession } from 'iron-session';
// import { sessionOptions } from '@/lib/session'; // Your session configuration
// import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import client from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // 1. Validate input (basic validation)
        if (!username || !password) {
            return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
        }

        // 2. Retrieve the user from the database
        const result = await client.query('SELECT id, username, password_hash FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        // 3. Compare the password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }

        // 4. Set a session cookie (very basic authentication)
        const cookieStore = await cookies(); // **AWAIT HERE**
        cookieStore.set('user', JSON.stringify({ id: user.id, username: user.username }), { // Store as JSON
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            path: '/', // Adjust path as needed
        })


        // 5. Return a success response
        return NextResponse.json({ message: 'Login successful' });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Login failed', details: error.message }, { status: 500 });
    }
}

// async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const { username, password } = req.body; // Get credentials from request

//         // [Database lookup and password comparison - Code omitted for brevity]

//         // Store user information in the session
//         req.session.user = {
//             id: user.id,
//             username: user.username,
//             isLoggedIn: true,
//         };
//         await req.session.save(); // Save the session

//         res.json({ message: 'Login successful' });

//     } catch (error) {
//         // [Error handling - Code omitted for brevity]
//     }
// }

// export default getIronSession(loginRoute, sessionOptions);