"use client";

import { useState, useEffect } from "react";
import { Users, Search, Mail, Phone, Calendar } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/contexts/ToastContext";
import { LoadingSpinner } from "@/components/ui/Loading";

export default function AdminCustomersPage() {
    const { showToast } = useToast();
    const [customers, setCustomers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            setIsLoading(true);
            // Use the users endpoint to get customers
            const data = await apiClient.users.getCustomers();
            setCustomers(data || []);
        } catch (error: any) {
            // If 401/403, user might not be admin - show empty state
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                showToast("error", "Bu sayfayı görüntüleme yetkiniz yok");
            } else {
                console.error("Failed to load customers:", error);
            }
            setCustomers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredCustomers = customers.filter(
        (customer) =>
            searchTerm === "" ||
            customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone?.includes(searchTerm)
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Müşteriler yükleniyor..." />
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Müşteriler</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Kayıtlı müşterileri görüntüleyin</p>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Ad, e-posta veya telefon ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Toplam Müşteri</p>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{customers.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg">
                            <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Bu Ay</p>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                {customers.filter((c) => {
                                    const date = new Date(c.createdAt);
                                    const now = new Date();
                                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                                }).length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 dark:bg-purple-950 rounded-lg">
                            <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">E-posta Onaylı</p>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                {customers.filter((c) => c.emailVerified).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Müşteri
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    İletişim
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Kayıt Tarihi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Sipariş
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    Toplam Harcama
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{customer.name}</div>
                                                <div className="text-sm text-zinc-500">ID: {customer.id}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-zinc-400" />
                                                {customer.email}
                                            </div>
                                            {customer.phone && (
                                                <div className="text-sm text-zinc-500 flex items-center gap-2 mt-1">
                                                    <Phone className="h-4 w-4 text-zinc-400" />
                                                    {customer.phone}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                                            {new Date(customer.createdAt).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                {customer._count?.orders || 0}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                                {customer.totalSpent?.toLocaleString("tr-TR") || "0"} TL
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <Users className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                                            <p className="text-zinc-500">Müşteri bulunamadı</p>
                                            <p className="text-sm text-zinc-400">
                                                {searchTerm ? "Arama kriterlerinize uygun müşteri yok" : "Henüz kayıtlı müşteri bulunmuyor"}
                                            </p>
                                        </div>
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
