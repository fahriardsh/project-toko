// src/app/home/page.tsx

import Sidebar from "@/components/layout/Sidebar"; // Import the sidebar component
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from 'next/image';

// Helper function to get the username from the cookie value
const getUsernameFromCookie = async (): Promise<string> => {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
        redirect('/login');
    }

    try {
        const user = JSON.parse(userCookie.value);
        if (typeof user?.username === 'string') {
            return user.username;
        } else {
            console.warn("Username not found in cookie or not a string, redirecting to login.");
            redirect('/login');
        }

    } catch (error) {
        console.error("Error parsing user cookie:", error);
        redirect('/login'); // Redirect if there's an error parsing the cookie
    }
};

export default async function HomePage() {
    const username = await getUsernameFromCookie();

    return (
        <div className="flex h-screen">
            {/* Use the imported AppSidebar component */}
            <Sidebar username={username} />

            {/* Main Content */}
            <main className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Welcome! {username}</h1>
                <p>This is the home page content.</p>
                <Image
                    src={'/avatar/man-w-sunglasses.jpg'}
                    alt="Avatar"
                    width={100}
                    height={100}
                />
            </main>
        </div>
    );
}