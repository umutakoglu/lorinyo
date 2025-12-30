import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center px-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                        Sayfa Bulunamadı
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <Home className="h-5 w-5" />
                        Ana Sayfaya Dön
                    </Link>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium rounded-lg transition-colors"
                    >
                        <Search className="h-5 w-5" />
                        Ürünlere Göz At
                    </Link>
                </div>

                <div className="mt-12">
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
                        Popüler Kategoriler:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Link href="/shop/category/elektronik" className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm transition-colors">
                            Elektronik
                        </Link>
                        <Link href="/shop/category/moda" className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm transition-colors">
                            Moda
                        </Link>
                        <Link href="/shop/category/ev-yasam" className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm transition-colors">
                            Ev & Yaşam
                        </Link>
                        <Link href="/shop/category/spor-outdoor" className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm transition-colors">
                            Spor & Outdoor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
