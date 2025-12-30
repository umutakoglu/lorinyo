"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/contexts/ToastContext";
import { LoadingSpinner } from "@/components/ui/Loading";

interface ProductFormData {
    name: string;
    sku: string;
    brand: string;
    shortDescription: string;
    description: string;
    price: number;
    originalPrice: number;
    stock: number;
    categoryId: string;
    isActive: boolean;
    isFeatured: boolean;
    images: { url: string; alt?: string; order?: number }[];
}

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const { showToast } = useToast();
    const productId = params.id as string; // This is actually the slug

    const [realProductId, setRealProductId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [imageUrlInput, setImageUrlInput] = useState("");
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        sku: "",
        brand: "",
        shortDescription: "",
        description: "",
        price: 0,
        originalPrice: 0,
        stock: 0,
        categoryId: "",
        isActive: true,
        isFeatured: false,
        images: [],
    });

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, [productId]);

    const loadProduct = async () => {
        try {
            setIsLoading(true);
            const product = await apiClient.products.getBySlug(productId);
            if (product) {
                setRealProductId(product.id);
                setFormData({
                    name: product.name || "",
                    sku: product.sku || "",
                    brand: product.brand || "",
                    shortDescription: product.shortDescription || "",
                    description: product.description || "",
                    price: product.price || 0,
                    originalPrice: product.originalPrice || 0,
                    stock: product.stock || 0,
                    categoryId: product.categoryId || "",
                    isActive: product.isActive ?? true,
                    isFeatured: product.isFeatured ?? false,
                    images: product.images ? product.images.map((img: any) => ({
                        url: img.url,
                        alt: img.alt,
                        order: img.order
                    })) : [],
                });
            }
        } catch (error) {
            showToast("error", "Ürün yüklenirken hata oluştu");
            router.push("/admin/products");
        } finally {
            setIsLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const data = await apiClient.categories.getAll();
            setCategories(data || []);
        } catch (error) {
            console.error("Failed to load categories:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) || 0 : value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleAddImage = () => {
        if (!imageUrlInput.trim()) return;

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, { url: imageUrlInput.trim(), order: prev.images.length }]
        }));
        setImageUrlInput("");
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSetFeatured = (indexToFeatured: number) => {
        setFormData(prev => {
            const newImages = [...prev.images];
            // Remove the selected image
            const [selectedImage] = newImages.splice(indexToFeatured, 1);
            // Add it to the beginning
            newImages.unshift(selectedImage);
            // Updating orders is implicit by index in UI, backend will receive array order
            return {
                ...prev,
                images: newImages
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.sku || !formData.price) {
            showToast("error", "Lütfen zorunlu alanları doldurun");
            return;
        }

        try {
            setIsSaving(true);
            await apiClient.products.update(realProductId, formData);
            showToast("success", "Ürün başarıyla güncellendi");
            router.push("/admin/products");
        } catch (error: any) {
            if (error?.response?.status === 401) {
                showToast("error", "Bu işlem için yetkiniz yok");
            } else {
                showToast("error", "Ürün güncellenirken hata oluştu");
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <LoadingSpinner size="lg" text="Ürün yükleniyor..." />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Ürünlere Dön
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Ürün Düzenle</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Ürün bilgilerini güncelleyin</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Temel Bilgiler</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Ürün Adı *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        SKU *
                                    </label>
                                    <input
                                        type="text"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        Marka
                                    </label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Kısa Açıklama
                                </label>
                                <input
                                    type="text"
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Detaylı Açıklama
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Fiyatlandırma</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Satış Fiyatı * (TL)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Eski Fiyat (TL)
                                </label>
                                <input
                                    type="number"
                                    name="originalPrice"
                                    value={formData.originalPrice || ""}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Stok</h2>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Stok Miktarı *
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                min="0"
                                className="w-full max-w-xs px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Kategori</h2>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Kategori *
                            </label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            >
                                <option value="">Kategori seçin...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Görseller</h2>

                        {/* Upload Area */}
                        <div className="flex gap-3 mb-6">
                            <div className="flex-1">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    id="image-upload"
                                    onChange={async (e) => {
                                        const files = e.target.files;
                                        if (!files) return;

                                        for (let i = 0; i < files.length; i++) {
                                            try {
                                                const res = await apiClient.upload(files[i]);
                                                setFormData(prev => ({
                                                    ...prev,
                                                    images: [...prev.images, { url: res.url, order: prev.images.length }]
                                                }));
                                            } catch (error) {
                                                console.error("Upload failed", error);
                                                showToast("error", "Görsel yüklenemedi");
                                            }
                                        }
                                    }}
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer hover:border-blue-500 transition-colors h-full text-zinc-600 dark:text-zinc-300"
                                >
                                    <Upload className="h-4 w-4" />
                                    <span>Görsel Yükle</span>
                                </label>
                            </div>

                            <div className="flex-[2] flex gap-2">
                                <input
                                    type="text"
                                    placeholder="veya görsel URL'si yapıştırın..."
                                    value={imageUrlInput}
                                    onChange={(e) => setImageUrlInput(e.target.value)}
                                    className="flex-1 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddImage}
                                    className="px-6 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors font-medium border border-zinc-200 dark:border-zinc-700"
                                >
                                    Ekle
                                </button>
                            </div>
                        </div>

                        {/* Image Grid */}
                        {formData.images.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="group relative aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                        <img
                                            src={img.url}
                                            alt={img.alt || `Ürün görseli ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Badges */}
                                        {index === 0 && (
                                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">
                                                Kapak
                                            </div>
                                        )}

                                        {/* Actions Overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                                            {index !== 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleSetFeatured(index)}
                                                    className="w-full py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-sm font-medium backdrop-blur-sm transition-colors"
                                                >
                                                    Kapak Yap
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="w-full py-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded text-sm font-medium backdrop-blur-sm transition-colors"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl">
                                <p className="text-zinc-500 dark:text-zinc-400">Henüz görsel eklenmemiş</p>
                            </div>
                        )}
                    </div>

                    {/* Status */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Durum</h2>

                        <div className="space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleCheckboxChange}
                                    className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-zinc-700 dark:text-zinc-300">Ürün aktif (yayında)</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleCheckboxChange}
                                    className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-zinc-700 dark:text-zinc-300">Öne çıkan ürün</span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Link
                            href="/admin/products"
                            className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors"
                        >
                            İptal
                        </Link>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Değişiklikleri Kaydet
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
