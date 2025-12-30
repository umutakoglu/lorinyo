/**
 * SEO-friendly slug generator for Turkish content
 * Converts: "Premium Kablosuz Kulaklık" -> "premium-kablosuz-kulaklik"
 */

const turkishCharMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U',
};

export function generateSlug(text: string): string {
    // Replace Turkish characters
    let slug = text.split('').map(char => turkishCharMap[char] || char).join('');

    // Convert to lowercase
    slug = slug.toLowerCase();

    // Replace spaces and special characters with hyphens
    slug = slug
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    return slug;
}

/**
 * Generate product URL from name and ID
 * Format: /shop/premium-kablosuz-kulaklik-p123
 */
export function generateProductUrl(name: string, id: number): string {
    const slug = generateSlug(name);
    return `/shop/${slug}-p${id}`;
}

/**
 * Extract product ID from slug
 * "premium-kablosuz-kulaklik-p123" -> 123
 */
export function extractProductId(slug: string): number | null {
    const match = slug.match(/-p(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
}

/**
 * Generate category URL
 * "Elektronik" -> "/shop/elektronik"
 */
export function generateCategoryUrl(name: string): string {
    const slug = generateSlug(name);
    return `/shop/kategori/${slug}`;
}

/**
 * Generate meta keywords from product name
 * "Premium Kablosuz Kulaklık" -> ["premium", "kablosuz", "kulaklık", "bluetooth", "ses", "müzik"]
 */
export function generateMetaKeywords(productName: string, category?: string): string[] {
    const slug = generateSlug(productName);
    const words = slug.split('-').filter(word => word.length > 2);

    // Add category if provided
    if (category) {
        words.push(generateSlug(category));
    }

    // Add common e-commerce keywords
    const commonKeywords = ['satın al', 'fiyat', 'indirim', 'kampanya', 'online', 'alışveriş'];

    return [...new Set([...words, ...commonKeywords])];
}

/**
 * Truncate text for meta description
 */
export function truncateForMeta(text: string, maxLength: number = 160): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}
