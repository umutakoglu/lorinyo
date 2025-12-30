import { generateSEOMetadata } from "@/lib/metadata";

export const metadata = generateSEOMetadata({
    title: "Anasayfa",
    description: "Lorinyo'da binlerce ürün arasından seçim yapın. Elektronik, moda, ev & yaşam ve daha fazlası. Hızlı kargo, kolay iade ve güvenli alışveriş imkanı.",
    keywords: ["online alışveriş", "e-ticaret", "elektronik", "moda", "kampanya", "indirim"],
});

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
