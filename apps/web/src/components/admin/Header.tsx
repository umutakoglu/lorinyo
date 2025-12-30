import { Bell, Search } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-16 w-full items-center justify-between border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm px-6 shadow-sm z-10 sticky top-0">
            <div className="flex items-center gap-4 relative">
                <Search className="h-4 w-4 text-zinc-400 absolute left-3" />
                <input
                    type="text"
                    placeholder="Ara..."
                    className="h-9 w-64 rounded-full border border-zinc-200 bg-zinc-50/50 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200"
                />
            </div>
            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-950"></span>
                </button>
                <div className="h-8 w-1 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Yönetici</p>
                        <p className="text-xs text-zinc-500">Süper Admin</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
