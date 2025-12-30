"use client";

import { ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateProductUrl } from "@/lib/seo";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { LoadingButton } from "@/components/ui/Loading";

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    badge?: string;
}

export function ProductCard({ id, name, price, originalPrice, image, badge }: ProductCardProps) {
    const router = useRouter();
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const productUrl = generateProductUrl(name, id);
    const { addItem } = useCart();
    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Guests can add to cart - will be stored in localStorage
        setIsAddingToCart(true);
        try {
            await addItem(id.toString(), 1);
            showToast("success", `${name} sepete eklendi!`);
        } catch (error) {
            showToast("error", "Sepete eklenirken bir hata oluştu");
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Check if user is authenticated
        if (!isAuthenticated) {
            showToast("info", "Favorilere eklemek için giriş yapmalısınız");
            router.push("/shop/login");
            return;
        }

        // TODO: Implement API call when user is logged in
        setIsFavorite(!isFavorite);
        showToast("info", isFavorite ? "Favorilerden çıkarıldı" : "Favorilere eklendi");
    };

    return (
        <Link href={productUrl} className="block">
            <div className="group relative rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
                {/* Badge */}
                {badge && (
                    <div className="absolute left-4 top-4 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        {badge}
                    </div>
                )}

                {/* Favorite Button */}
                <button
                    onClick={handleToggleFavorite}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 opacity-0 shadow-md transition-opacity group-hover:opacity-100 dark:bg-zinc-900"
                >
                    <Heart
                        className={`h-4 w-4 transition-colors ${isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-zinc-600 dark:text-zinc-400"
                            }`}
                    />
                </button>

                {/* Image */}
                <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                    <div className="flex h-full items-center justify-center text-zinc-400">
                        <ShoppingBag className="h-16 w-16" />
                    </div>
                </div>

                {/* Info */}
                <h3 className="mb-2 line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                        {price.toLocaleString('tr-TR')} TL
                    </span>
                    {originalPrice && (
                        <>
                            <span className="text-sm text-zinc-500 line-through">
                                {originalPrice.toLocaleString('tr-TR')} TL
                            </span>
                            <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                                %{discount}
                            </span>
                        </>
                    )}
                </div>

                {/* Add to Cart Button */}
                <LoadingButton
                    onClick={handleAddToCart}
                    isLoading={isAddingToCart}
                    className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={isAddingToCart}
                >
                    Sepete Ekle
                </LoadingButton>
            </div>
        </Link>
    );
}
