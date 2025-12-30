"use client";

import { useState, useEffect } from "react";
import { Package, Search, Filter, MoreVertical, Eye, Truck } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/contexts/ToastContext";
import { LoadingSpinner } from "@/components/ui/Loading";

export default function AdminOrdersPage() {
    const { showToast } = useToast();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setIsLoading(true);
            const data = await apiClient.orders.getAll();
            setOrders(data || []);
        } catch (error) {
            showToast("error", "Siparişler yüklenirken hata oluştu");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            await apiClient.orders.updateStatus(orderId, newStatus);
            showToast("success", "Sipariş durumu güncellendi!");
            loadOrders();
        } catch (error: any) {
            showToast("error", "Durum güncellenirken hata oluştu");
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { label: string; className: string }> = {
            PENDING: { label: "Beklemede", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
            PROCESSING: { label: "Hazırlanıyor", className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" },
            SHIPPED: { label: "Kargoda", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400" },
            DELIVERED: { label: "Teslim Edildi", className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" },
            CANCELLED: { label: "İptal", className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" },
        };
        const config = statusMap[status] || statusMap.PENDING;
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>{config.label}</span>;
    };

    const filteredOrders = orders.filter((order) => {
        const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
        const matchesSearch =
            searchTerm === "" ||
            order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Siparişler yükleniyor..." />
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Siparişler</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Tüm siparişleri yönetin</p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Sipariş ID veya müşteri ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="ALL">Tüm Durumlar</option>
                    <option value="PENDING">Beklemede</option>
                    <option value="PROCESSING">Hazırlanıyor</option>
                    <option value="SHIPPED">Kargoda</option>
                    <option value="DELIVERED">Teslim Edildi</option>
                    <option value="CANCELLED">İptal</option>
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Toplam</p>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{orders.length}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Beklemede</p>
                    <p className="text-2xl font-bold text-yellow-600">{orders.filter((o) => o.status === "PENDING").length}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Kargoda</p>
                    <p className="text-2xl font-bold text-blue-600">{orders.filter((o) => o.status === "SHIPPED").length}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Tamamlanan</p>
                    <p className="text-2xl font-bold text-green-600">{orders.filter((o) => o.status === "DELIVERED").length}</p>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Sipariş
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Müşteri
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Tarih
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Tutar
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Durum
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">#{order.id}</div>
                                                <div className="text-sm text-zinc-500">{order.items?.length || 0} ürün</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-zinc-900 dark:text-zinc-50">{order.user?.name || "N/A"}</div>
                                            <div className="text-sm text-zinc-500">{order.user?.email || "N/A"}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                                            {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                {order.total?.toLocaleString("tr-TR")} TL
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                className="px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="PENDING">Beklemede</option>
                                                <option value="PROCESSING">Hazırlanıyor</option>
                                                <option value="SHIPPED">Kargoda</option>
                                                <option value="DELIVERED">Teslim Edildi</option>
                                                <option value="CANCELLED">İptal</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                        Sipariş bulunamadı
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
