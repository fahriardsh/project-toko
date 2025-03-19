
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProductCardDetail from '@/components/product-card';

interface Product {
    product: any;
    productId: number;
    product_name: string;
    variant: string;
    description: string;
}

// Remove unused type definition: type Params = Promise<{ id: any }>;
type Params = Promise<{ productId: any }>;

// async function getProduct(productId: number): Promise<Product | null> {

//     try {
//         // Build the URL with the id as a query parameter.
//         const baseUrl = process.env.NODE_ENV === 'development'
//         ? 'http://localhost:3000/'  // Your development URL
//         : 'project-toko-seven.vercel.app'; // Leave empty in production (it will be relative)
//         const url = baseUrl + `/api/product/product-id?id=${productId}`;

//         const response = await fetch(url, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         // Remove the body for GET requests. The data should be sent through the query string.
//         });

//         if (!response.ok) {
//         console.error("Error fetching product:", response.status, response.statusText);
//         return null; // Handle non-200 responses
//         }

//         const data: Product = await response.json(); // Type assertion to Product

//         return data; // Return the product data
//     } catch (e: any) {
//         console.error("Error fetching product:", e);
//         return null; // Handle errors
//     }
// }

// Helper function to get the username from the cookie value
const getUsernameFromCookie = async (): Promise<string> => {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    try {
        const user = JSON.parse(userCookie.value);
        if (typeof user?.username === "string") {
        return user.username;
        } else {
        console.warn("Username not found in cookie or not a string, redirecting to login.");
        redirect("/login");
        }
    } catch (error) {
        console.error("Error parsing user cookie:", error);
        redirect("/login"); // Redirect if there's an error parsing the cookie
    }
};

export default async function ProductDetailPage(props: { params: Params }) {
    const { productId } = await props.params;
    // const product = await getProduct(productId);

    if (isNaN(productId)) {
        return <div>Invalid Product ID</div>; // Handle invalid ID
    }

    const username = await getUsernameFromCookie();

    const data = {
        user: {
        name: username,
        avatar: "/avatar/man-w-sunglasses.jpg",
        },
    };

    // if (!product) {
    //     return <div>Product not found</div>; // Handle the case where the product doesn't exist
    // }

    // const datas = product.product

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
                    <ProductCardDetail id={productId}></ProductCardDetail>
                </main>
                <footer className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                    </div>
                    <div className="flex flex-end items-center gap-2 px-3">
                    <p>© PROJECT TOKO.</p>
                    </div>
                </footer>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}