import { generateCategoryMetadata } from "@/lib/metadata";

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

// Generate metadata dynamically based on category
export async function generateMetadata({ params }: CategoryPageProps) {
    // In real app, fetch category details from API
    const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

    return generateCategoryMetadata({
        name: categoryName,
        productCount: 12, // This would come from API
    });
}

export default function CategoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
