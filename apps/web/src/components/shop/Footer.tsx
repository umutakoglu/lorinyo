import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-zinc-900 text-zinc-300">
            {/* Newsletter */}
            <div className="border-b border-zinc-800">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Kampanyalardan Haberdar Olun</h3>
                            <p className="text-zinc-400">En yeni ürünler ve özel indirimler için e-bültenimize kayıt olun.</p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="E-posta adresiniz"
                                className="flex-1 md:w-80 h-12 px-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                            <button className="px-6 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                Abone Ol
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-white font-bold mb-4">Kurumsal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/shop/about" className="hover:text-white transition-colors">Hakkımızda</Link></li>
                            <li><Link href="/shop/contact" className="hover:text-white transition-colors">İletişim</Link></li>
                            <li><Link href="/shop/careers" className="hover:text-white transition-colors">Kariyer</Link></li>
                            <li><Link href="/shop/stores" className="hover:text-white transition-colors">Mağazalarımız</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Müşteri Hizmetleri</h4>
                        <ul className="space-y-2">
                            <li><Link href="/shop/faq" className="hover:text-white transition-colors">Sıkça Sorulan Sorular</Link></li>
                            <li><Link href="/shop/shipping" className="hover:text-white transition-colors">Kargo & Teslimat</Link></li>
                            <li><Link href="/shop/returns" className="hover:text-white transition-colors">İade & Değişim</Link></li>
                            <li><Link href="/shop/support" className="hover:text-white transition-colors">Destek Talebi</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Hesabım</h4>
                        <ul className="space-y-2">
                            <li><Link href="/shop/account" className="hover:text-white transition-colors">Siparişlerim</Link></li>
                            <li><Link href="/shop/account" className="hover:text-white transition-colors">Favorilerim</Link></li>
                            <li><Link href="/shop/account" className="hover:text-white transition-colors">Adreslerim</Link></li>
                            <li><Link href="/shop/account" className="hover:text-white transition-colors">Hesap Ayarları</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Bizi Takip Edin</h4>
                        <div className="flex gap-3 mb-6">
                            <a href="#" className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-pink-600 flex items-center justify-center transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-blue-400 flex items-center justify-center transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-red-600 flex items-center justify-center transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="text-sm text-zinc-400">Müşteri Hizmetleri</p>
                        <p className="text-white font-bold text-lg">0850 123 45 67</p>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-zinc-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-zinc-500">© 2024 Lorinyo. Tüm hakları saklıdır.</p>
                        <div className="flex gap-4 text-sm">
                            <Link href="/shop/privacy" className="text-zinc-500 hover:text-white transition-colors">Gizlilik Politikası</Link>
                            <Link href="/shop/terms" className="text-zinc-500 hover:text-white transition-colors">Kullanım Koşulları</Link>
                            <Link href="/shop/kvkk" className="text-zinc-500 hover:text-white transition-colors">KVKK</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
