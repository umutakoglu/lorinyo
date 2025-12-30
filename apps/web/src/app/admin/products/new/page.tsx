"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, X } from "lucide-react";
import { apiClient } from "@/lib/api-client";

export default function AddProductPage() {
    const [images, setImages] = useState<string[]>([]);

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
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Yeni Ürün Ekle</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">Ürün bilgilerini girin</p>
                </div>

                <form className="space-y-6">
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
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Premium Kablosuz Kulaklık"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        SKU *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="PRD-001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        Marka
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="TechSound"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Kısa Açıklama
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="40 saat pil ömrü, ANC teknolojisi"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Detaylı Açıklama *
                                </label>
                                <textarea
                                    rows={6}
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Ürün hakkında detaylı bilgi..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Fiyatlandırma</h2>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Satış Fiyatı *
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="1299"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">TL</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Eski Fiyat
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="1999"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">TL</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Maliyet
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="800"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">TL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Stok</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Stok Miktarı *
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Düşük Stok Uyarısı
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="5"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Kategori</h2>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Kategori *
                            </label>
                            <select className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                <option>Kategori seçin...</option>
                                <option>Elektronik</option>
                                <option>Moda</option>
                                <option>Ev & Yaşam</option>
                                <option>Spor & Outdoor</option>
                                <option>Kozmetik</option>
                                <option>Kitap & Hobi</option>
                            </select>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Görseller</h2>

                        <div className="space-y-6">
                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
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
                                                setImages((prev) => [...prev, res.url]);
                                            } catch (error) {
                                                console.error("Upload failed", error);
                                            }
                                        }
                                    }}
                                />
                                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                                    <Upload className="h-12 w-12 text-zinc-400 mb-4" />
                                    <p className="text-zinc-500 mb-2">Görselleri sürükleyip bırakın veya seçin</p>
                                    <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-lg transition-colors">
                                        Görsel Seç
                                    </span>
                                </label>
                            </div>

                            {/* Image Grid */}
                            {images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {images.map((url, index) => (
                                        <div key={index} className="group relative aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                            <img
                                                src={url}
                                                alt={`Product ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setImages(images.filter((_, i) => i !== index))}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            {index === 0 && (
                                                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                                    Kapak
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
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
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Ürünü Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
