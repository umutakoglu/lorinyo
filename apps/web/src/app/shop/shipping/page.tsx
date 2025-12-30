import { Package, Truck, RotateCcw, Clock, CreditCard, ShieldCheck } from "lucide-react";

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Kargo ve İade</h1>
                    <p className="text-xl text-blue-100">
                        Teslimat ve iade süreçleri hakkında bilgiler
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Shipping Info */}
                <div className="max-w-6xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
                        Kargo Bilgileri
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                Ücretsiz Kargo
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                500 TL ve üzeri alışverişlerde kargo bedava
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                Hızlı Teslimat
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                1-3 iş günü içinde kargoya teslim
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                Güvenli Paketleme
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Ürünleriniz özenle paketlenir
                            </p>
                        </div>
                    </div>
                </div>

                {/* Detailed Info */}
                <div className="max-w-4xl mx-auto">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                            Kargo Ücretleri
                        </h2>
                        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                                    <div>
                                        <p className="font-medium text-zinc-900 dark:text-zinc-50">
                                            500 TL ve üzeri
                                        </p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Tüm siparişlerde
                                        </p>
                                    </div>
                                    <span className="text-green-600 font-bold">ÜCRETSİZ</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-zinc-900 dark:text-zinc-50">
                                            500 TL altı
                                        </p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Standart kargo
                                        </p>
                                    </div>
                                    <span className="text-zinc-900 dark:text-zinc-50 font-bold">49,90 TL</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                            Teslimat Süreleri
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                                        Sipariş Hazırlama
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        Siparişiniz onaylandıktan sonra 1-3 iş günü içinde hazırlanır ve kargoya verilir
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                                        Kargoda
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        Bulunduğunuz bölgeye göre 1-5 iş günü içinde teslim edilir
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                                        Teslimat
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        Kargo görevlisi sizi arayarak teslimat saatini belirler
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
                            <RotateCcw className="h-6 w-6 text-blue-600" />
                            İade Süreci
                        </h2>
                        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 space-y-4">
                            <div>
                                <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                                    14 Gün İade Hakkı
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Ürünü teslim aldıktan sonra 14 gün içinde sebep belirtmeden iade edebilirsiniz
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                                    İade Koşulları
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                                    <li>Ürün kullanılmamış olmalıdır</li>
                                    <li>Orijinal ambalajında olmalıdır</li>
                                    <li>Ürün etiketi ve faturayla birlikte iade edilmelidir</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                                    İade Süreci
                                </h3>
                                <ol className="list-decimal list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                                    <li>Hesabım > Siparişlerim bölümünden iade talebi oluşturun</li>
                                    <li>Kargo firması ürünü tarafınızdan alacaktır</li>
                                    <li>Ürün depoya ulaştıktan sonra kontrol edilir</li>
                                    <li>3-5 iş günü içinde ödeme iadeniz yapılır</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                            Ödeme ve Güvenlik
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                                <CreditCard className="h-8 w-8 text-blue-600 mb-3" />
                                <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                                    Ödeme Seçenekleri
                                </h3>
                                <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 text-sm">
                                    <li>• Kredi Kartı</li>
                                    <li>• Banka Kartı</li>
                                    <li>• Havale/EFT</li>
                                    <li>• Kapıda Ödeme</li>
                                </ul>
                            </div>

                            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                                <ShieldCheck className="h-8 w-8 text-blue-600 mb-3" />
                                <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                                    Güvenlik
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                                    Tüm ödeme işlemleriniz 256-bit SSL sertifikası ile güvence altındadır.
                                    Kart bilgileriniz asla saklanmaz.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-900">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                            Sorunuz mu var?
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Kargo ve iade süreçleri hakkında detaylı bilgi için müşteri hizmetlerimizle iletişime geçin
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="/shop/contact"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                            >
                                Bize Ulaşın
                            </a>
                            <a
                                href="/shop/faq"
                                className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-lg text-sm transition-colors"
                            >
                                SSS
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
