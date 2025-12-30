"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { apiClient } from "@/lib/api-client";
import { ProductCard } from "@/components/shop/ProductCard";
import { LoadingSpinner } from "@/components/ui/Loading";
import { useRouter } from "next/navigation";

export default function MyAccountPage() {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("orders");

    if (!isAuthenticated) {
        router.push("/shop/login");
        return null;
    }

    const menuItems = [
        { id: "orders", icon: Package, label: "Siparişlerim" },
        { id: "favorites", icon: Heart, label: "Favorilerim" },
        { id: "addresses", icon: MapPin, label: "Adreslerim" },
        { id: "profile", icon: User, label: "Hesap Bilgilerim" },
        { id: "settings", icon: Settings, label: "Ayarlar" },
    ];

    const handleLogout = () => {
        logout();
        router.push("/shop");
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Hesabım</h1>
                            <p className="text-zinc-600 dark:text-zinc-400 mt-1">{user?.email}</p>
                        </div>
                        <Link
                            href="/shop"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Alışverişe Dön
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                            <nav className="space-y-1">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                            ? "bg-blue-600 text-white"
                                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.count && (
                                            <span className={`text-xs px-2 py-1 rounded-full ${activeTab === item.id ? "bg-white/20" : "bg-zinc-200 dark:bg-zinc-800"
                                                }`}>
                                                {item.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                                    <LogOut className="h-5 w-5" />
                                    <span>Çıkış Yap</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                            {activeTab === "orders" && <OrdersTab />}
                            {activeTab === "favorites" && <FavoritesTab />}
                            {activeTab === "addresses" && <AddressesTab />}
                            {activeTab === "profile" && <ProfileTab />}
                            {activeTab === "settings" && <SettingsTab />}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

function OrdersTab() {
    const { showToast } = useToast();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await apiClient.orders.getAll();
                setOrders(data || []);
            } catch (error) {
                showToast("error", "Siparişler yüklenirken hata oluştu");
            } finally {
                setIsLoading(false);
            }
        };
        loadOrders();
    }, [showToast]);

    if (isLoading) {
        return <LoadingSpinner size="md" text="Siparişler yükleniyor..." />;
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Siparişlerim</h2>
            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 hover:border-blue-600 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="font-medium text-zinc-900 dark:text-zinc-50">Sipariş #{order.id}</p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "DELIVERED"
                                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                                        : order.status === "SHIPPED"
                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                                        }`}
                                >
                                    {order.status === "DELIVERED" ? "Teslim Edildi" : order.status === "SHIPPED" ? "Kargoda" : "Hazırlanıyor"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {order.items?.length || 0} ürün •{" "}
                                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                        {order.total?.toLocaleString("tr-TR")} TL
                                    </span>
                                </div>
                                <Link
                                    href={`/shop/account/orders/${order.id}`}
                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                                >
                                    Detaylar <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-zinc-600 dark:text-zinc-400">Henüz siparişiniz bulunmuyor.</p>
            )}
        </div>
    );
}

function FavoritesTab() {
    const { showToast } = useToast();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const data = await apiClient.favorites.getAll();
                setFavorites(data || []);
            } catch (error) {
                showToast("error", "Favoriler yüklenirken hata oluştu");
            } finally {
                setIsLoading(false);
            }
        };
        loadFavorites();
    }, [showToast]);

    if (isLoading) {
        return <LoadingSpinner size="md" text="Favoriler yük leniyor..." />;
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Favorilerim</h2>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((fav) => (
                        <ProductCard
                            key={fav.id}
                            id={fav.product?.id}
                            name={fav.product?.name}
                            price={fav.product?.price}
                            originalPrice={fav.product?.originalPrice}
                            image={fav.product?.images?.[0]?.url}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-zinc-600 dark:text-zinc-400">Henüz favori ürününüz yok.</p>
            )}
        </div>
    );
}

function AddressesTab() {
    return (
        <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Adreslerim</h2>
            <button className="w-full py-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-400 hover:border-blue-600 hover:text-blue-600 transition-colors">
                + Yeni Adres Ekle
            </button>
        </div>
    );
}

function ProfileTab() {
    return (
        <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Hesap Bilgilerim</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Ad Soyad
                    </label>
                    <input
                        type="text"
                        defaultValue="Test Customer"
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        E-posta
                    </label>
                    <input
                        type="email"
                        defaultValue="customer@example.com"
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Telefon
                    </label>
                    <input
                        type="tel"
                        defaultValue="+90 555 123 4567"
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                    />
                </div>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    Kaydet
                </button>
            </div>
        </div>
    );
}

function SettingsTab() {
    return (
        <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Ayarlar</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-3">Bildirimler</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-zinc-700 dark:text-zinc-300">E-posta bildirimleri</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-zinc-700 dark:text-zinc-300">Sipariş güncellemeleri</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span className="text-zinc-700 dark:text-zinc-300">Kampanya bildirimleri</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
