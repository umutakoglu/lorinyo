"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
    onClose?: () => void;
    isMobile?: boolean;
}

export function FilterSidebar({ onClose, isMobile = false }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const brands = ["Samsung", "Apple", "Xiaomi", "Huawei", "Oppo"];
    const colors = [
        { name: "Siyah", value: "black", color: "#000000" },
        { name: "Beyaz", value: "white", color: "#FFFFFF" },
        { name: "Mavi", value: "blue", color: "#3B82F6" },
        { name: "Kırmızı", value: "red", color: "#EF4444" },
    ];

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const toggleColor = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const content = (
        <div className="space-y-6">
            {/* Header - Mobile Only */}
            {isMobile && (
                <div className="flex items-center justify-between pb-4 border-b">
                    <h2 className="text-lg font-bold">Filtreler</h2>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-lg dark:hover:bg-zinc-800">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            )}

            {/* Price Range */}
            <div>
                <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">Fiyat Aralığı</h3>
                <div className="space-y-3">
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
                        <span>0 ₺</span>
                        <span>{priceRange[1].toLocaleString('tr-TR')} ₺</span>
                    </div>
                </div>
            </div>

            {/* Brands */}
            <div>
                <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">Marka</h3>
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => toggleBrand(brand)}
                                className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Colors */}
            <div>
                <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">Renk</h3>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => toggleColor(color.value)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${selectedColors.includes(color.value)
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800"
                                }`}
                        >
                            <div
                                className="h-4 w-4 rounded-full border border-zinc-300"
                                style={{ backgroundColor: color.color }}
                            />
                            <span>{color.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Stock Status */}
            <div>
                <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">Stok Durumu</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Sadece Stokta Olanlar</span>
                </label>
            </div>

            {/* Apply Button - Mobile Only */}
            {isMobile && (
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Filtreleri Uygula
                </button>
            )}
        </div>
    );

    if (isMobile) {
        return (
            <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-zinc-950 p-6 overflow-y-auto">
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-6 text-lg font-bold text-zinc-900 dark:text-zinc-50">Filtreler</h2>
            {content}
        </div>
    );
}
