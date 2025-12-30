import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">İletişim</h1>
                    <p className="text-xl text-blue-100">
                        Size nasıl yardımcı olabiliriz?
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                            Bize Ulaşın
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Ad Soyad
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-600"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    E-posta
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-600"
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Telefon
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-600"
                                    placeholder="+90 555 123 4567"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Konu
                                </label>
                                <select className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-600">
                                    <option>Sipariş</option>
                                    <option>İade</option>
                                    <option>Kargo</option>
                                    <option>Ürün</option>
                                    <option>Diğer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Mesajınız
                                </label>
                                <textarea
                                    rows={6}
                                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-blue-600"
                                    placeholder="Mesajınızı yazın..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Gönder
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                            İletişim Bilgileri
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
                                    <Mail className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">E-posta</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">info@lorinyo.com</p>
                                    <p className="text-zinc-600 dark:text-zinc-400">destek@lorinyo.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
                                    <Phone className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">Telefon</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">0850 123 4567</p>
                                    <p className="text-zinc-600 dark:text-zinc-400">+90 212 123 4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
                                    <MapPin className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">Adres</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        Lorinyo E-Ticaret A.Ş.<br />
                                        Maslak Mahallesi, Bilim Sokak No:5<br />
                                        Sarıyer/İstanbul, Türkiye
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
                                    <Clock className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">Çalışma Saatleri</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        Pazartesi - Cuma: 09:00 - 18:00<br />
                                        Cumartesi: 10:00 - 16:00<br />
                                        Pazar: Kapalı
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900">
                            <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                                Sıkça Sorulan Sorular
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                Aradığınız cevabı bulamadınız mı?
                            </p>
                            <Link
                                href="/shop/faq"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                            >
                                SSS'yi İncele →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
