// src/app/home/page.tsx

import Sidebar from "@/components/layout/Sidebar"; // Import the new sidebar component
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from 'next/image';

// Helper function to get the username from the cookie value
const getUsernameFromCookie = async (): Promise<string | null> => {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
        redirect('/login')
    }

    try {
        const user = JSON.parse(userCookie.value);
        return user.username || null; // Safely access the username
    } catch (error) {
        console.error("Error parsing user cookie:", error);
        return null;
    }
};

export default async function HomePage() {
    const username = await getUsernameFromCookie();

    return (
        <div className="flex h-screen">
            {/* Use the imported AppSidebar component */}
            <Sidebar />

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