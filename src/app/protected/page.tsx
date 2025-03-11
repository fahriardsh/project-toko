'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('user');
    cookieStore.set('user', '', { expires: new Date(0) }); // Ensure it's deleted
    redirect('/login');
}

export default async function ProtectedPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) {
    redirect('/login');
  }

  try {
    const user = JSON.parse(userCookie.value);  // Parse the JSON string
    const userId = user.id;
    const username = user.username;

    return (
      <div>
        <h1>Protected Page</h1>
        <p>Welcome, user {username} (ID: {userId})!</p>
        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
      </div>
    );
  } catch (error) {
    // Handle JSON parsing error (cookie might be corrupted)
    console.error("Error parsing user cookie:", error);
    redirect('/login'); // Redirect to login if cookie is invalid
    return null; // Required to satisfy TypeScript
  }
}