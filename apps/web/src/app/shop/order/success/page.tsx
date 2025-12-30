import { CheckCircle, Package, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
    const orderNumber = "LOR-2024-001234";
    const orderDate = new Date().toLocaleDateString('tr-TR');

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-24 w-24 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                        Siparişiniz Alındı!
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Siparişiniz başarıyla oluşturuldu. Sipariş detaylarını e-posta adresinize gönderdik.
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                        <div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Sipariş Numarası</p>
                            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{orderNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Sipariş Tarihi</p>
                            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{orderDate}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-zinc-900 dark:text-zinc-50">Kargoya Verilecek</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Siparişiniz hazırlanıyor, en kısa sürede kargoya verilecek.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-zinc-900 dark:text-zinc-50">Teslimat Adresi</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Atatürk Cad. No: 123 Daire: 4<br />
                                    Kadıköy, İstanbul 34710
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-zinc-900 dark:text-zinc-50">Ödeme Yöntemi</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Kredi Kartı (**** 1234)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/shop/account/orders"
                        className="flex-1 py-3 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700"
                    >
                        Siparişlerimi Görüntüle
                    </Link>
                    <Link
                        href="/shop"
                        className="flex-1 py-3 border border-zinc-200 dark:border-zinc-800 text-center rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                        Alışverişe Devam Et
                    </Link>
                </div>

                {/* Help */}
                <div className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    <p>
                        Sorularınız için{" "}
                        <Link href="/shop/support" className="text-blue-600 hover:underline">
                            Müşteri Hizmetleri
                        </Link>
                        'mize ulaşabilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
}
