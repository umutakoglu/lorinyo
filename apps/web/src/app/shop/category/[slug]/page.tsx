"use client";

import { useState, useEffect } from "react";
import { Filter, LayoutGrid, List } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/contexts/ToastContext";
import { LoadingSpinner } from "@/components/ui/Loading";

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

const sortOptions = [
    { value: "default", label: "Varsayılan" },
    { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
    { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
    { value: "newest", label: "En Yeniler" },
    { value: "popular", label: "En Popüler" },
];

export default function CategoryPage({ params }: CategoryPageProps) {
    const { showToast } = useToast();
    const [products, setProducts] = useState<any[]>([]);
    const [category, setCategory] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadCategoryData = async () => {
            try {
                setIsLoading(true);

                // Fetch category info and products
                const [categoryData, productsData] = await Promise.all([
                    apiClient.categories.getBySlug(params.slug),
                    apiClient.products.getAll({
                        categorySlug: params.slug,
                        page: currentPage,
                        take: 12,
                        sortBy: sortBy !== 'default' ? sortBy : undefined
                    })
                ]);

                setCategory(categoryData);
                setProducts(productsData.data || []);
                setTotalPages(productsData.meta?.totalPages || 1);
            } catch (error: any) {
                console.error('Failed to load category data:', error);
                showToast('error', 'Kategori yüklenirken bir hata oluştu');

                // Fallback data
                setCategory({ name: params.slug.charAt(0).toUpperCase() + params.slug.slice(1) });
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadCategoryData();
    }, [params.slug, currentPage, sortBy, showToast]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Yükleniyor..." />
            </div>
        );
    }

    const categoryName = category?.name || params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

    return (
        <div className="bg-zinc-50 dark:bg-zinc-950/50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <a href="/shop" className="hover:text-blue-600">Anasayfa</a>
                        <span>/</span>
                        <span className="text-zinc-900 dark:text-zinc-50 font-medium">{categoryName}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                    {categoryName}
                                </h1>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {products.length} ürün bulundu
                                </p>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setShowFilters(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                                >
                                    <Filter className="h-4 w-4" />
                                    <span>Filtrele</span>
                                </button>

                                {/* Sort */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="flex-1 sm:flex-initial px-4 py-2 border border-zinc-200 rounded-lg bg-white dark:bg-zinc-950 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                {/* View Mode - Desktop Only */}
                                <div className="hidden sm:flex gap-1 border border-zinc-200 rounded-lg p-1 dark:border-zinc-800">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded ${viewMode === "grid"
                                                ? "bg-blue-600 text-white"
                                                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                            }`}
                                    >
                                        <LayoutGrid className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded ${viewMode === "list"
                                                ? "bg-blue-600 text-white"
                                                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                            }`}
                                    >
                                        <List className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {products.length > 0 ? (
                            <>
                                <div
                                    className={`grid gap-6 ${viewMode === "grid"
                                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                            : "grid-cols-1"
                                        }`}
                                >
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            originalPrice={product.originalPrice}
                                            image={product.image || product.images?.[0]?.url}
                                            badge={
                                                product.badge ||
                                                (product.originalPrice
                                                    ? `%${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}`
                                                    : undefined)
                                            }
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Önceki
                                            </button>
                                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`px-4 py-2 rounded-lg ${page === currentPage
                                                            ? "bg-blue-600 text-white"
                                                            : "border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Sonraki
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-zinc-600 dark:text-zinc-400">Bu kategoride henüz ürün bulunmuyor.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Sidebar */}
            {showFilters && (
                <FilterSidebar isMobile onClose={() => setShowFilters(false)} />
            )}
        </div>
    );
}
