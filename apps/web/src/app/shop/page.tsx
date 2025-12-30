"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { generateSlug } from "@/lib/seo";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/contexts/ToastContext";
import { LoadingSpinner } from "@/components/ui/Loading";

export default function ShopHomepage() {
    const { showToast } = useToast();
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);

                // Fetch featured products and categories in parallel
                const [productsData, categoriesData] = await Promise.all([
                    apiClient.products.getAll({ take: 8, featured: true }),
                    apiClient.categories.getAll()
                ]);

                setProducts(productsData.data || []);
                setCategories(categoriesData || []);
            } catch (error: any) {
                console.error('Failed to load homepage data:', error);
                showToast('error', 'Veriler yüklenirken bir hata oluştu');

                // Fallback to mock data on error
                setProducts([
                    { id: 1, name: "Premium Kablosuz Kulaklık", price: 1299, originalPrice: 1999, image: "/products/1.jpg", badge: "%35" },
                    { id: 2, name: "Akıllı Saat Pro Series", price: 3499, originalPrice: 4999, image: "/products/2.jpg", badge: "%30" },
                    { id: 3, name: "Laptop Stand Ayarlanabilir", price: 299, image: "/products/3.jpg" },
                    { id: 4, name: "Mekanik Klavye RGB", price: 899, originalPrice: 1299, image: "/products/4.jpg", badge: "%31" },
                    { id: 5, name: "Wireless Mouse 2.4GHz", price: 199, image: "/products/5.jpg" },
                    { id: 6, name: "USB-C Hub 7-in-1", price: 449, originalPrice: 699, image: "/products/6.jpg", badge: "%36" },
                    { id: 7, name: "Webcam 1080p HD", price: 599, image: "/products/7.jpg" },
                    { id: 8, name: "Taşınabilir SSD 1TB", price: 1699, originalPrice: 2199, image: "/products/8.jpg", badge: "%23" },
                ]);
                setCategories([
                    { name: "Elektronik", slug: "elektronik", count: 1234 },
                    { name: "Moda", slug: "moda", count: 2567 },
                    { name: "Ev & Yaşam", slug: "ev-yasam", count: 891 },
                    { name: "Spor & Outdoor", slug: "spor-outdoor", count: 456 },
                    { name: "Kozmetik", slug: "kozmetik", count: 1123 },
                    { name: "Kitap & Hobi", slug: "kitap-hobi", count: 789 },
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [showToast]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Yükleniyor..." />
            </div>
        );
    }

    return (
        <div>
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container mx-auto px-4 py-20 md:py-32">
                    <div className="max-w-2xl">
                        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                            Kış İndirimleri Başladı
                        </h1>
                        <p className="mb-8 text-lg text-blue-100 md:text-xl">
                            Seçili ürünlerde %50'ye varan indirimler. Fırsatlar kaçmadan al!
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="/shop/category/elektronik"
                                className="rounded-lg bg-white px-8 py-3 font-medium text-blue-600 transition-transform hover:scale-105"
                            >
                                Alışverişe Başla
                            </Link>
                            <Link
                                href="/shop"
                                className="rounded-lg border-2 border-white px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
                            >
                                Kampanyaları Gör
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-zinc-950"></div>
            </section>

            {/* Categories */}
            <section className="container mx-auto px-4 py-16">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Kategoriler</h2>
                    <Link href="/shop" className="flex items-center gap-2 text-blue-600 hover:gap-3 transition-all">
                        Tümünü Gör
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id || category.name}
                            href={`/shop/category/${category.slug || generateSlug(category.name)}`}
                            className="group relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 aspect-square"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                            <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                                <h3 className="text-lg font-bold text-white mb-1">{category.name}</h3>
                                <p className="text-sm text-zinc-300">
                                    {category.count ? `${category.count.toLocaleString('tr-TR')} Ürün` : ''}
                                </p>
                            </div>
                            <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:scale-110 transition-transform">
                                <span className="text-4xl">📦</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="bg-zinc-50 dark:bg-zinc-900/50 py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Öne Çıkan Ürünler</h2>
                            <p className="text-zinc-600 dark:text-zinc-400">En popüler ve en çok satanlar</p>
                        </div>
                        <Link href="/shop" className="flex items-center gap-2 text-blue-600 hover:gap-3 transition-all">
                            Tümünü Gör
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    originalPrice={product.originalPrice}
                                    image={product.image || product.images?.[0]?.url}
                                    badge={product.badge || (product.originalPrice ? `%${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}` : undefined)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-zinc-600 dark:text-zinc-400">Henüz ürün bulunmuyor.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
                        <div className="mb-4 text-4xl">🚚</div>
                        <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">Ücretsiz Kargo</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">500 TL ve üzeri alışverişlerde</p>
                    </div>
                    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
                        <div className="mb-4 text-4xl">🔒</div>
                        <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">Güvenli Ödeme</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">256-bit SSL sertifikası</p>
                    </div>
                    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
                        <div className="mb-4 text-4xl">↩️</div>
                        <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">Kolay İade</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">14 gün içinde ücretsiz iade</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
