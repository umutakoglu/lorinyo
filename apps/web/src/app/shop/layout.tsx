import type { Metadata } from "next";
import { Navbar } from "@/components/shop/Navbar";
import { Footer } from "@/components/shop/Footer";

export const metadata: Metadata = {
    title: "Lorinyo - Online Alışveriş Sitesi",
    description: "En yeni ürünler, en iyi fiyatlar. Güvenli alışverişin adresi.",
};

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
