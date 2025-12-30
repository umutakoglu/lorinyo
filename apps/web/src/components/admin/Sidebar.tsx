"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Package, Users, FolderTree, Truck, CreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
    { icon: LayoutDashboard, label: "Kontrol Paneli", href: "/admin" },
    { icon: FolderTree, label: "Kategoriler", href: "/admin/categories" },
    { icon: Package, label: "Ürünler", href: "/admin/products" },
    { icon: ShoppingBag, label: "Siparişler", href: "/admin/orders" },
    { icon: Users, label: "Müşteriler", href: "/admin/customers" },
    { icon: Settings, label: "Ayarlar", href: "/admin/settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        router.push("/shop/login");
    };

    return (
        <div className="flex h-screen w-64 flex-col bg-zinc-900 text-white transition-all duration-300 shadow-xl z-20">
            <div className="flex h-16 items-center px-6 border-b border-zinc-800">
                <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    LORINYO
                </h1>
                <span className="ml-2 text-xs text-zinc-500">Admin</span>
            </div>
            <nav className="flex-1 space-y-2 p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href ||
                        (item.href !== "/admin" && pathname?.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-blue-400 border-l-2 border-blue-500"
                                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-zinc-800 p-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                >
                    <LogOut className="h-5 w-5" />
                    Çıkış Yap
                </button>
            </div>
        </div>
    );
}

