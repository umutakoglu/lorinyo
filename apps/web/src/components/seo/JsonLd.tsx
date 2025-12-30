interface ProductSchemaProps {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    sku?: string;
    brand?: string;
    category?: string;
    inStock?: boolean;
    ratingValue?: number;
    reviewCount?: number;
    url: string;
}

/**
 * Generate JSON-LD Schema.org markup for products
 * For rich snippets in Google search results
 */
export function generateProductSchema(product: ProductSchemaProps) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        sku: product.sku || `PROD-${Date.now()}`,
        brand: {
            '@type': 'Brand',
            name: product.brand || 'Lorinyo',
        },
        offers: {
            '@type': 'Offer',
            url: product.url,
            priceCurrency: product.currency || 'TRY',
            price: product.price,
            availability: product.inStock !== false
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'Lorinyo',
            },
        },
        aggregateRating: product.ratingValue ? {
            '@type': 'AggregateRating',
            ratingValue: product.ratingValue,
            reviewCount: product.reviewCount || 0,
        } : undefined,
    };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Generate organization schema
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Lorinyo',
        url: 'https://lorinyo.com',
        logo: 'https://lorinyo.com/logo.png',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+90-850-123-4567',
            contactType: 'customer service',
            areaServed: 'TR',
            availableLanguage: 'Turkish',
        },
        sameAs: [
            'https://facebook.com/lorinyo',
            'https://instagram.com/lorinyo',
            'https://twitter.com/lorinyo',
        ],
    };
}

/**
 * Component to inject JSON-LD schema into page
 */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
