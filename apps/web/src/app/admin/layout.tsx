import type { Metadata } from "next";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

export const metadata: Metadata = {
    title: "Admin Panel - Lorinyo",
    description: "Lorinyo Integration Platform Admin Dashboard",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950/50">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none rounded-tl-3xl z-0" />
                <Header />
                <main className="flex-1 overflow-y-auto p-8 relative z-10 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    {children}
                </main>
            </div>
        </div>
    );
}
