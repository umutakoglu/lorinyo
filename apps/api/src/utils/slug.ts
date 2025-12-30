/**
 * SEO-friendly slug generator for Turkish content
 * Converts: "Premium Kablosuz Kulaklık" -> "premium-kablosuz-kulaklik"
 */

const turkishCharMap: Record<string, string> = {
    ç: 'c',
    Ç: 'C',
    ğ: 'g',
    Ğ: 'G',
    ı: 'i',
    İ: 'I',
    ö: 'o',
    Ö: 'O',
    ş: 's',
    Ş: 'S',
    ü: 'u',
    Ü: 'U',
};

export function generateSlug(text: string): string {
    // Replace Turkish characters
    let slug = text
        .split('')
        .map((char) => turkishCharMap[char] || char)
        .join('');

    // Convert to lowercase
    slug = slug.toLowerCase();

    // Replace spaces and special characters with hyphens
    slug = slug.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return slug;
}

/**
 * Generate unique product slug with ID
 * Format: premium-kablosuz-kulaklik-p123
 */
export function generateProductSlug(name: string, id: number | string): string {
    const slug = generateSlug(name);
    return `${slug}-p${id}`;
}
