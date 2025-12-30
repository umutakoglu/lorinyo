"use client";

import { useState, useEffect } from "react";
import { Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { extractProductId, generateSlug } from "@/lib/seo";
import { JsonLd, generateProductSchema, generateBreadcrumbSchema } from "@/components/seo/JsonLd";
import { apiClient } from "@/lib/api-client";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { LoadingSpinner, LoadingButton } from "@/components/ui/Loading";

interface ProductPageProps {
    params: {
        slug: string;
    };
}

// Mock data
const product = {
    id: 1,
    name: "Premium Kablosuz Bluetooth Kulaklık",
    price: 1299,
    originalPrice: 1999,
    rating: 4.5,
    reviewCount: 247,
    stock: 15,
    sku: "PRD-001",
    brand: "TechSound",
    description: `
    <p>Yüksek kaliteli ses deneyimi için tasarlanmış premium kablosuz kulaklık. 
    Gelişmiş aktif gürültü önleme (ANC) teknolojisi ile çevrenizdeki istenmeyen sesleri engelleyin.</p>
    
    <h3>Özellikler:</h3>
    <ul>
      <li>40 saate kadar pil ömrü</li>
      <li>Hızlı şarj özelliği (10 dk şarj = 5 saat kullanım)</li>
      <li>Premium deri kulak yastıkları</li>
      <li>Gelişmiş Bluetooth 5.3 bağlantısı</li>
    </ul>
  `,
    features: [
        { icon: Truck, title: "Ücretsiz Kargo", desc: "500 TL üzeri siparişlerde" },
        { icon: Shield, title: "2 Yıl Garanti", desc: "Resmi distribütör garantisi" },
        { icon: RotateCcw, title: "14 Gün İade", desc: "Koşulsuz iade hakkı" },
    ],
    specs: [
        { label: "Bağlantı", value: "Bluetooth 5.3" },
        { label: "Pil Ömrü", value: "40 saat" },
        { label: "Şarj Süresi", value: "2 saat" },
        { label: "Ağırlık", value: "250g" },
        { label: "Renk", value: "Siyah" },
    ],
    images: ["/product-1.jpg", "/product-2.jpg", "/product-3.jpg", "/product-4.jpg"],
};

const relatedProducts = [
    { id: 10, name: "Kablosuz Şarj Pad", price: 399, originalPrice: 599, image: "/products/10.jpg" },
    { id: 11, name: "Kulaklık Standı", price: 249, image: "/products/11.jpg" },
    { id: 12, name: "Aux Kablo 3.5mm", price: 49, originalPrice: 99, image: "/products/12.jpg" },
    { id: 13, name: "Taşıma Çantası", price: 199, image: "/products/13.jpg" },
];

export default function ProductPage({ params }: ProductPageProps) {
    const productId = extractProductId(params.slug);
    const { addItem } = useCart();
    const { showToast } = useToast();

    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = useState<"description" | "specs" | "reviews">("description");

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setIsLoading(true);
                const [productData, relatedData] = await Promise.all([
                    apiClient.products.getBySlug(params.slug),
                    apiClient.products.getRelated(productId.toString()).catch(() => [])
                ]);
                setProduct(productData);
                setRelatedProducts(relatedData || []);

                // Load reviews
                try {
                    const reviewsData = await apiClient.reviews.getProductReviews(productData.id);
                    setReviews(reviewsData.reviews || []);
                } catch (err) {
                    setReviews([]);
                }
            } catch (error) {
                showToast('error', 'Ürün yüklenirken hata oluştu');
            } finally {
                setIsLoading(false);
            }
        };
        loadProduct();
    }, [params.slug, productId, showToast]);

    const handleAddToCart = async () => {
        if (!product) return;
        setIsAddingToCart(true);
        try {
            await addItem(product.id.toString(), quantity);
            showToast('success', `${product.name} sepete eklendi!`);
        } catch (error) {
            showToast('error', 'Sepete eklenirken hata oluştu');
        } finally {
            setIsAddingToCart(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Yükleniyor..." />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Ürün bulunamadı</h2>
                    <Link href="/shop" className="text-blue-600 hover:text-blue-700">Ana sayfaya dön</Link>
                </div>
            </div>
        );
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // Generate canonical URL
    const canonicalUrl = `https://lorinyo.com/shop/${params.slug}`;

    // Generate breadcrumb items
    const breadcrumbItems = [
        { name: 'Anasayfa', url: 'https://lorinyo.com' },
        { name: 'Elektronik', url: 'https://lorinyo.com/shop/category/elektronik' },
        { name: product.name, url: canonicalUrl },
    ];

    return (
        <>
            {/* SEO: JSON-LD Schema */}
            <JsonLd data={generateProductSchema({
                name: product.name,
                description: product.description.replace(/<[^>]*>/g, '').slice(0, 200),
                image: 'https://lorinyo.com/placeholder-product.jpg',
                price: product.price,
                currency: 'TRY',
                sku: product.sku,
                brand: product.brand,
                inStock: product.stock > 0,
                ratingValue: product.rating,
                reviewCount: product.reviewCount,
                url: canonicalUrl,
            })} />
            <JsonLd data={generateBreadcrumbSchema(breadcrumbItems)} />

            <div className="bg-white dark:bg-zinc-950">
                {/* Breadcrumb */}
                <div className="border-b border-zinc-200 dark:border-zinc-800">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <a href="/shop" className="hover:text-blue-600">Anasayfa</a>
                            <span>/</span>
                            {product.category && (
                                <>
                                    <a
                                        href={`/shop/category/${product.category.slug || generateSlug(product.category.name)}`}
                                        className="hover:text-blue-600"
                                    >
                                        {product.category.name}
                                    </a>
                                    <span>/</span>
                                </>
                            )}
                            <span className="text-zinc-900 dark:text-zinc-50">{product.name}</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Images */}
                        <div>
                            <div className="relative aspect-square rounded-xl bg-zinc-100 dark:bg-zinc-900 mb-4 overflow-hidden">
                                <div className="flex items-center justify-center h-full text-6xl">📷</div>
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                                    %{discount} İNDİRİM
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-lg bg-zinc-100 dark:bg-zinc-900 border-2 transition-all ${selectedImage === idx
                                            ? "border-blue-600"
                                            : "border-transparent hover:border-zinc-300"
                                            }`}
                                    >
                                        <div className="flex items-center justify-center h-full text-3xl">📷</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Info */}
                        <div>
                            <div className="mb-4">
                                <span className="text-blue-600 text-sm font-medium">{product.brand}</span>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1 mb-3">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(product.rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-zinc-300"
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-2">
                                            {product.rating} ({product.reviewCount} değerlendirme)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-6 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                                        {product.price.toLocaleString('tr-TR')} TL
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-zinc-500 line-through">
                                            {product.originalPrice.toLocaleString('tr-TR')} TL
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-green-600 font-medium">Stokta {product.stock} adet</p>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="mb-6 flex gap-4">
                                <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                    >
                                        -
                                    </button>
                                    <span className="px-6 py-3 border-x border-zinc-200 dark:border-zinc-800">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    <ShoppingCart className="h-5 w-5" />
                                    Sepete Ekle
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="mb-8 flex gap-3">
                                <button className="flex-1 border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                    <Heart className="h-5 w-5" />
                                    Favorilere Ekle
                                </button>
                                <button className="border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                                    <Share2 className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4">
                                {product.features.map((feature, idx) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div key={idx} className="text-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                                            <Icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                {feature.title}
                                            </div>
                                            <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                                                {feature.desc}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-16">
                        <div className="border-b border-zinc-200 dark:border-zinc-800 mb-8">
                            <div className="flex gap-8">
                                {["description", "specs", "reviews"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSelectedTab(tab as any)}
                                        className={`pb-4 font-medium transition-colors ${selectedTab === tab
                                            ? "text-blue-600 border-b-2 border-blue-600"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                                            }`}
                                    >
                                        {tab === "description" && "Açıklama"}
                                        {tab === "specs" && "Özellikler"}
                                        {tab === "reviews" && "Değerlendirmeler"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedTab === "description" && (
                            <div className="prose prose-zinc dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        )}

                        {selectedTab === "specs" && (
                            <div className="grid md:grid-cols-2 gap-4">
                                {product.specs.map((spec, idx) => (
                                    <div key={idx} className="flex justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                                        <span className="font-medium text-zinc-900 dark:text-zinc-50">{spec.label}</span>
                                        <span className="text-zinc-600 dark:text-zinc-400">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedTab === "reviews" && (
                            <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
                                Henüz değerlendirme yok. İlk değerlendirmeyi siz yapın!
                            </div>
                        )}
                    </div>

                    {/* Related Products */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">İlgili Ürünler</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

