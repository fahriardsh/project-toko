"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import LogoutButton from '@/components/layout/LogoutButton'

export function NavUser({
  user,
}: {
  user: {
    name: string
    // email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {/* <span className="truncate text-xs">{user.email}</span> */}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  {/* <span className="truncate text-xs">{user.email}</span> */}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
              {/* <LogOut />
               Log out */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}


// -- Insert statements for the products table

// INSERT INTO products (product_name, variant, description) VALUES ('Asparagus Kaleng', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Ampela Ayam', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Ayam Kampung', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Bakso Warisan', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Bakso Polos Kebon Jeruk', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Beras Ketan Paris', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Bawang Goreng', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Bawang Merah Kupas', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Bawang Putih Kupas', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Black Bean Amoy', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Bubuk Kari', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Bihun Jagung Cap Tanam', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Chiki Balls', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Cup Polkadot', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Dancow', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Dashi Powder', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Dry Wakame', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Forvita Margarin', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Garam Segitiga Emas', '250g', NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Garam Segitiga Emas', '500g', NULL); 
// INSERT INTO products (product_name, variant, description) VALUES ('Golden Curry', 'Medium Hot', NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Golden Curry', 'Mild', NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Gula Pasir Rose Brand', 'Kuning', NULL); 
// INSERT INTO products (product_name, variant, description) VALUES ('Gula Pasir Rose Brand', 'Hijau', NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Garpu Plastik', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Hati Ayam', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Indocafe Coffeemix', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Indomie Ayam Bawang', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Jeruk Mandarin', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Kacang Polong', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Kapulaga', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Kecap Manis ABC', '62ml', NULL);  
// INSERT INTO products (product_name, variant, description) VALUES ('Kecap Manis Bango', '77ml', NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Kulit Tahu', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Kulit Pangsit Kotak', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Lada Bubuk Sachet', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Masako Ayam', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Maestro Mayonaise', '1kg', NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Maestro Wijen', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Maestro Thousand Island', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Mecin Sasa', '1kg', NULL); 
// INSERT INTO products (product_name, variant, description) VALUES ('Mecin Sasa', '14gr', NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Mie 3 Ayam', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Mie Ramen', '570gr', NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Mushroom Kaleng', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Minyak Kelapa Kara', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Misoa Marga Mulia', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Nescafe 3 in 1', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Nutrisari Jeruk', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Palmia Butter', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Palmia Margarin', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Proteina', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Quaker Oat', '1,2kg', NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Royco Sapi', NULL, NULL);
// INSERT INTO products (product_name, variant, description) VALUES ('Rice Crispy', 'Coklat', NULL);