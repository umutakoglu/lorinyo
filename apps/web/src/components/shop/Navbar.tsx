"use client";

import { Search, ShoppingCart, User, Heart, Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/lib/seo";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const categories = [
    "Elektronik",
    "Moda",
    "Ev & Yaşam",
    "Spor & Outdoor",
    "Kozmetik",
    "Kitap & Hobi"
];

export function Navbar() {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();
    const { itemCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 shadow-sm">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-sm">
                <p>🎉 Kış İndirimleri Başladı! Seçili Ürünlerde %50'ye Varan İndirim</p>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/shop" className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">L</span>
                        </div>
                        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Lorinyo</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Ürün, kategori veya marka ara..."
                                className="w-full h-10 pl-10 pr-4 rounded-full border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Favorites */}
                        <Link href={isAuthenticated ? "/shop/account" : "/shop/login"} className="hidden md:flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                            <Heart className="h-5 w-5" />
                            <span className="text-sm">Favoriler</span>
                        </Link>

                        {/* User Menu */}
                        <div className="relative">
                            {isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="hidden md:flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                                    >
                                        <User className="h-5 w-5" />
                                        <span className="text-sm">{user?.name || user?.email}</span>
                                    </button>

                                    {/* Dropdown */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-2">
                                            <Link
                                                href="/shop/account"
                                                className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Hesabım
                                            </Link>
                                            <Link
                                                href="/shop/account"
                                                className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Siparişlerim
                                            </Link>
                                            {user?.role === 'ADMIN' && (
                                                <Link
                                                    href="/admin"
                                                    className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    Admin Panel
                                                </Link>
                                            )}
                                            <hr className="my-2 border-zinc-200 dark:border-zinc-800" />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Çıkış Yap
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link href="/shop/login" className="hidden md:flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                                    <User className="h-5 w-5" />
                                    <span className="text-sm">Giriş Yap</span>
                                </Link>
                            )}
                        </div>

                        {/* Cart */}
                        <Link href="/shop/cart" className="relative flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="hidden md:inline text-sm">Sepetim</span>
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                    {itemCount > 9 ? '9+' : itemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Categories - Desktop */}
                <div className="hidden md:flex items-center gap-6 py-3 border-t border-zinc-100 dark:border-zinc-900">
                    {categories.map((category) => (
                        <Link
                            key={category}
                            href={`/shop/category/${generateSlug(category)}`}
                            className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800">
                    <div className="container mx-auto px-4 py-4">
                        {/* Search - Mobile */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Ara..."
                                className="w-full h-10 pl-10 pr-4 rounded-lg border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-800"
                            />
                        </div>

                        {/* Categories - Mobile */}
                        <div className="space-y-2 mb-4">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/shop/category/${generateSlug(category)}`}
                                    className="block py-2 text-sm text-zinc-700 dark:text-zinc-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>

                        {/* User Actions - Mobile */}
                        <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        href="/shop/account"
                                        className="block py-2 text-sm text-zinc-700 dark:text-zinc-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Hesabım
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left py-2 text-sm text-red-600 dark:text-red-400"
                                    >
                                        Çıkış Yap
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/shop/login"
                                    className="block py-2 text-sm text-blue-600 dark:text-blue-400"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Giriş Yap / Kayıt Ol
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
