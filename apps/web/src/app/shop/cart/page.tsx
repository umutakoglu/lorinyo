"use client";

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { LoadingSpinner } from "@/components/ui/Loading";

export default function CartPage() {
    const { items, itemCount, subtotal, isLoading, updateQuantity, removeItem, refreshCart } = useCart();

    useEffect(() => {
        refreshCart();
    }, []);

    const shipping = subtotal > 500 ? 0 : 29.9;
    const total = subtotal + shipping;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Y\u00fckleniyor..." />
            </div>
        );
    }

    if (itemCount === 0) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="h-24 w-24 mx-auto text-zinc-300 dark:text-zinc-700 mb-4" />
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                        Sepetiniz Boş
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        Henüz sepetinize ürün eklemediniz.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                    >
                        Alışverişe Başla
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Sepetim</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6"
                            >
                                <div className="flex gap-4">
                                    <div className="h-24 w-24 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex-shrink-0 flex items-center justify-center">
                                        <span className="text-3xl">📦</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                                            {item.product?.name || 'Ürün'}
                                        </h3>
                                        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                            {(item.product?.price || 0).toLocaleString('tr-TR')} TL
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-600 p-2"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="px-4 py-2 border-x border-zinc-200 dark:border-zinc-800 min-w-[3rem] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
                                Sipariş Özeti
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                    <span>Ara Toplam</span>
                                    <span>{subtotal.toLocaleString('tr-TR')} TL</span>
                                </div>
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                    <span>Kargo</span>
                                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                                        {shipping === 0 ? "Ücretsiz" : `${shipping.toFixed(2)} TL`}
                                    </span>
                                </div>
                                {shipping > 0 && subtotal < 500 && (
                                    <div className="text-sm text-blue-600 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                                        {(500 - subtotal).toLocaleString('tr-TR')} TL daha alışveriş yapın,
                                        kargo ücretsiz olsun!
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mb-6">
                                <div className="flex justify-between text-xl font-bold text-zinc-900 dark:text-zinc-50">
                                    <span>Toplam</span>
                                    <span>{total.toLocaleString('tr-TR')} TL</span>
                                </div>
                            </div>

                            <Link
                                href="/shop/checkout"
                                className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 mb-3"
                            >
                                Ödemeye Geç
                            </Link>
                            <Link
                                href="/shop"
                                className="block w-full py-3 border border-zinc-200 dark:border-zinc-800 text-center rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            >
                                Alışverişe Devam Et
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
