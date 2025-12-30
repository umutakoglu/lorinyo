import { ArrowUpRight, DollarSign, Users, CreditCard, Activity, TrendingUp, Package } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock component for reusable card
function StatCard({ title, value, subtext, icon: Icon, trend }: any) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{value}</h3>
                </div>
                <div className="rounded-full bg-blue-500/10 p-3 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
                <span className={cn("flex items-center font-medium", trend > 0 ? "text-emerald-500" : "text-red-500")}>
                    {trend > 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingUp className="mr-1 h-3 w-3 rotate-180" />}
                    {Math.abs(trend)}%
                </span>
                <span className="ml-2 text-zinc-500">geçen aya göre</span>
            </div>
        </div>
    )
}

export default function AdminDashboard() {
    const stats = [
        { label: "Toplam Gelir", value: "₺324,500", change: "+12.5", icon: DollarSign },
        { label: "Siparişler", value: "1,234", change: "+8.2", icon: Package },
        { label: "Müşteriler", value: "8,456", change: "+23.1", icon: Users },
        { label: "Aktif Ürünler", value: "456", change: "+5.4", icon: CreditCard },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Kontrol Paneli</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Mağazanızın performansı ve son aktiviteler.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        trend={parseFloat(stat.change)}
                    />
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                        <h3 className="text-lg font-semibold leading-none">Gelir Özeti</h3>
                    </div>
                    <div className="p-6">
                        <div className="h-[300px] w-full rounded-xl bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 animate-pulse">
                            Grafik Görselleştirme Alanı
                        </div>
                    </div>
                </div>
                <div className="col-span-3 rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                        <h3 className="text-lg font-semibold leading-none">Son Satışlar</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
                                    <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-400">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">Sipariş No</th>
                                            <th scope="col" className="py-3 px-6">Müşteri</th>
                                            <th scope="col" className="py-3 px-6">Tutar</th>
                                            <th scope="col" className="py-3 px-6">Durum</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                            <td className="py-3 px-6">#1234</td>
                                            <td className="py-3 px-6">Ahmet Yılmaz</td>
                                            <td className="py-3 px-6">1.299 TL</td>
                                            <td className="py-3 px-6"><span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">Tamamlandı</span></td>
                                        </tr>
                                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                            <td className="py-3 px-6">#1233</td>
                                            <td className="py-3 px-6">Ayşe Demir</td>
                                            <td className="py-3 px-6">3.499 TL</td>
                                            <td className="py-3 px-6"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs">Hazırlanıyor</span></td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-6">#1232</td>
                                            <td className="py-3 px-6">Mehmet Kaya</td>
                                            <td className="py-3 px-6">899 TL</td>
                                            <td className="py-3 px-6"><span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">Kargoda</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
