// src/components/LogoutButton.tsx
"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { logout } from "@/app/actions";

export default function LogoutButton() {
    const router = useRouter();
    const handleLogout = useCallback(async () => {
        await logout()
        router.push('/login')
    }, [router])
    return (
        <form action={handleLogout}>
            <button type="submit" className="flex items-center space-x-2">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
            </button>
        </form>
    );
}