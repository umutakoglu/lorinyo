"use client";

import { useState, useEffect } from "react";
import { FolderTree, Plus, Pencil, Trash2, Search, Save, X } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/contexts/ToastContext";
import { LoadingSpinner } from "@/components/ui/Loading";

interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentId?: string;
    _count?: {
        products: number;
    };
}

export default function AdminCategoriesPage() {
    const { showToast } = useToast();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setIsLoading(true);
            const data = await apiClient.categories.getAll();
            setCategories(data || []);
        } catch (error) {
            showToast("error", "Kategoriler yüklenirken hata oluştu");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredCategories = categories.filter(
        (cat) =>
            searchTerm === "" ||
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openCreateModal = () => {
        setEditingCategory(null);
        setFormData({ name: "", description: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setFormData({ name: category.name, description: category.description || "" });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: "", description: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            showToast("error", "Kategori adı gereklidir");
            return;
        }

        try {
            setIsSaving(true);
            if (editingCategory) {
                await apiClient.categories.update(editingCategory.id, formData);
                showToast("success", "Kategori güncellendi");
            } else {
                await apiClient.categories.create(formData);
                showToast("success", "Kategori oluşturuldu");
            }
            closeModal();
            loadCategories();
        } catch (error: any) {
            if (error?.response?.status === 401) {
                showToast("error", "Bu işlem için yetkiniz yok");
            } else {
                showToast("error", "İşlem başarısız oldu");
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (category: Category) => {
        if (!confirm(`"${category.name}" kategorisini silmek istediğinize emin misiniz?`)) {
            return;
        }

        try {
            await apiClient.categories.delete(category.id);
            showToast("success", "Kategori silindi");
            loadCategories();
        } catch (error: any) {
            if (error?.response?.status === 401) {
                showToast("error", "Bu işlem için yetkiniz yok");
            } else {
                showToast("error", "Kategori silinemedi");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Kategoriler yükleniyor..." />
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Kategoriler</h1>
                    <p className="text-zinc-600 dark:text-zinc-400">Ürün kategorilerini yönetin</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Yeni Kategori
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Kategori ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
                            <FolderTree className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Kategori</p>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{categories.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg">
                            <FolderTree className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Ürünlü Kategoriler</p>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                {categories.filter((c) => (c._count?.products || 0) > 0).length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 dark:bg-purple-950 rounded-lg">
                            <FolderTree className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Ürün</p>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                {categories.reduce((sum, c) => sum + (c._count?.products || 0), 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Kategori
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Ürün Sayısı
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <tr key={category.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg">
                                                    <FolderTree className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{category.name}</div>
                                                    {category.description && (
                                                        <div className="text-xs text-zinc-500 truncate max-w-xs">{category.description}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                                {category.slug}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                {category._count?.products || 0} ürün
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(category)}
                                                    className="p-2 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category)}
                                                    className="p-2 text-zinc-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <FolderTree className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                                            <p className="text-zinc-500">Kategori bulunamadı</p>
                                            <p className="text-sm text-zinc-400">
                                                {searchTerm ? "Arama kriterlerinize uygun kategori yok" : "Henüz kategori eklenmemiş"}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
                    <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                                {editingCategory ? "Kategori Düzenle" : "Yeni Kategori"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Kategori Adı *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Örn: Elektronik"
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Açıklama
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Kategori açıklaması (opsiyonel)"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />
                                    {isSaving ? "Kaydediliyor..." : "Kaydet"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
