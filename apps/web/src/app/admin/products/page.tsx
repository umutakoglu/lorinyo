"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/contexts/ToastContext";
import { LoadingSpinner } from "@/components/ui/Loading";

export default function AdminProductsPage() {
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Load products
    useEffect(() => {
        loadProducts();
    }, []);

    // Filter products when search or filter changes
    useEffect(() => {
        let result = products;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.sku.toLowerCase().includes(query)
            );
        }

        if (statusFilter !== "all") {
            if (statusFilter === "active") {
                result = result.filter(p => p.stock > 0 && p.isActive);
            } else if (statusFilter === "out_of_stock") {
                result = result.filter(p => p.stock <= 0);
            } else if (statusFilter === "inactive") {
                result = result.filter(p => !p.isActive);
            }
        }

        setFilteredProducts(result);
    }, [products, searchQuery, statusFilter]);

    const loadProducts = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.products.getAll();
            const data = Array.isArray(response) ? response : (response.data || []);
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error("Failed to load products:", error);
            showToast("error", "Ürünler yüklenirken hata oluştu");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

        try {
            await apiClient.products.delete(id);
            setProducts(products.filter(p => p.id !== id));
            showToast("success", "Ürün başarıyla silindi");
        } catch (error: any) {
            if (error?.response?.status === 401) {
                showToast("error", "Bu işlem için yetkiniz yok");
            } else {
                showToast("error", "Silme işlemi başarısız oldu");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Ürünler yükleniyor..." />
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Ürünler</h1>
                    <p className="text-zinc-600 dark:text-zinc-400">Tüm ürünleri yönetin</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Yeni Ürün Ekle
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Ürün adı, SKU veya marka ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">Tüm Durumlar</option>
                    <option value="active">Aktif (Stokta)</option>
                    <option value="out_of_stock">Stokta Yok</option>
                    <option value="inactive">Pasif</option>
                </select>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Ürün</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Marka/SKU</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Fiyat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Stok</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Durum</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <Package className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                                            <p className="text-zinc-500">Ürün bulunamadı</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
                                                    {product.images && product.images[0] ? (
                                                        <img
                                                            src={product.images[0].url}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="h-5 w-5 text-zinc-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{product.name}</div>
                                                    <div className="text-xs text-zinc-500">{product.category?.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-zinc-900 dark:text-zinc-50">{product.brand || "-"}</div>
                                            <div className="text-xs text-zinc-500">{product.sku}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                {product.price.toLocaleString('tr-TR')} TL
                                            </div>
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <div className="text-xs text-zinc-500 line-through">
                                                    {product.originalPrice.toLocaleString('tr-TR')} TL
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm ${product.stock > 10 ? 'text-green-600 dark:text-green-400' : product.stock > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {product.stock} adet
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isActive && product.stock > 0
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                {!product.isActive ? 'Pasif' : product.stock > 0 ? 'Aktif' : 'Stok Yok'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/${product.slug}/edit`}
                                                    className="p-2 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-zinc-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
