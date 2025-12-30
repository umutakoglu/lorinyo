import { Metadata } from 'next';

interface SEOPageProps {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'product';
}

/**
 * Generate SEO-optimized metadata for pages
 */
export function generateSEOMetadata({
    title,
    description,
    keywords = [],
    canonical,
    ogImage = '/og-image.jpg',
    ogType = 'website',
}: SEOPageProps): Metadata {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lorinyo.com';
    const fullTitle = `${title} | Lorinyo - Online Alışveriş`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: 'Lorinyo' }],
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: canonical || siteUrl,
        },
        openGraph: {
            type: ogType as 'website' | 'article',
            locale: 'tr_TR',
            url: canonical || siteUrl,
            title: fullTitle,
            description,
            siteName: 'Lorinyo',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [ogImage],
        },
    };
}

/**
 * Generate product-specific metadata with schema.org
 */
export function generateProductMetadata(product: {
    name: string;
    description: string;
    price: number;
    category: string;
    brand?: string;
    image?: string;
    sku?: string;
    inStock?: boolean;
}): Metadata {
    const keywords = [
        product.name,
        product.category,
        product.brand || '',
        'satın al',
        'fiyat',
        'online alışveriş',
        'Türkiye',
    ].filter(Boolean);

    return generateSEOMetadata({
        title: product.name,
        description: `${product.name} ürününü en uygun fiyatla satın alın. ${product.description} ✓ Hızlı kargo ✓ Kolay iade`,
        keywords,
        ogType: 'product',
        ogImage: product.image,
    });
}

/**
 * Generate category page metadata
 */
export function generateCategoryMetadata(category: {
    name: string;
    description?: string;
    productCount?: number;
}): Metadata {
    const description = category.description ||
        `${category.name} kategorisindeki ${category.productCount || 'birçok'} ürünü inceleyin. En uygun fiyatlar ve kampanyalı ürünler Lorinyo'da!`;

    return generateSEOMetadata({
        title: `${category.name} Ürünleri`,
        description,
        keywords: [category.name, 'ürünleri', 'fiyatları', 'modelleri', 'satın al', 'online'],
    });
}
