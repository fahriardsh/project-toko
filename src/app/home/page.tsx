// src/app/home/page.tsx

import { AppSidebar } from "@/components/app-sidebar"
// import Sidebar from "@/components/layout/Sidebar"; // Import the sidebar component
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import MyGrid from '@/components/my-grid';
import ProductListContainer from '@/components/home-product-table';
import ProductCardContainer from '@/components/home-product-card';
import {ProductBarchartContainer} from '@/components/home-product-barchart';

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

    const data = {
        user: {
          name: username,
          // email: "m@example.com",
          avatar: "/avatar/man-w-sunglasses.jpg",
        }
      }

    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <AppSidebar data={data} />
                <SidebarInset>
                    <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                    </div>
                    </header>
                    <main className="flex-1 p-4">
                        <ProductCardContainer />
                        <br />
                        <ProductBarchartContainer />
                        <br />
                        <ProductListContainer />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}