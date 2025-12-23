export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Lorinyo Platform</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Omni-Channel E-Commerce Integration Platform
                </p>
                <div className="flex gap-4 justify-center">
                    <a
                        href="/admin"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                    >
                        Admin Panel
                    </a>
                    <a
                        href="/shop"
                        className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition"
                    >
                        Shop
                    </a>
                </div>
            </div>
        </div>
    );
}
