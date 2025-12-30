export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Kullanım Koşulları</h1>
                    <p className="text-xl text-blue-100">
                        Son Güncellenme: 25 Aralık 2024
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            1. Genel Hükümler
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Lorinyo e-ticaret sitesini kullanarak aşağıdaki kullanım koşullarını kabul etmiş
                            sayılırsınız. Bu koşulları kabul etmiyorsanız siteyi kullanmamalısınız.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            2. Üyelik ve Hesap Güvenliği
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>Üyelik için verdiğiniz bilgilerin doğru ve güncel olması gerekmektedir</li>
                            <li>Hesap şifrenizin gizliliğinden siz sorumlusunuz</li>
                            <li>18 yaşından küçükler ebeveyn izni ile alışveriş yapabilir</li>
                            <li>Bir kişi birden fazla hesap açamaz</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            3. Sipariş ve Ödeme
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>Sipariş onayı e-posta ile tarafınıza iletilir</li>
                            <li>Ödeme işlemi tamamlanmadan sipariş kesinleşmez</li>
                            <li>Fiyatlar ve kampanyalar önceden haber verilmeksizin değiştirilebilir</li>
                            <li>Stok durumuna göre siparişiniz iptal edilebilir</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            4. Teslimat
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Teslimat süreleri tahminidir ve garanti edilmez. Kargo süreleri ilgili kargo
                            firmasının sorumluluğundadır. Hasarlı veya eksik ürünleri teslim almayınız.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            5. İade ve İptal
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>Cayma hakkı teslim tarihinden itibaren 14 gündür</li>
                            <li>İade edilen ürünler kullanılmamış ve ambalajı açılmamış olmalıdır</li>
                            <li>Kişiye özel üretilen ürünlerde cayma hakkı yoktur</li>
                            <li>İade bedelleri 10 iş günü içinde iade edilir</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            6. Fikri Mülkiyet Hakları
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Sitedeki tüm içerik, logo, tasarım ve yazılımlar Lorinyo'ya aittir ve telif
                            hakları ile korunmaktadır. İzinsiz kullanılamaz, kopyalanamaz veya değiştirilemez.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            7. Sorumluluk Sınırlamaları
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>Lorinyo, site kesintilerinden sorumlu değildir</li>
                            <li>Üçüncü taraf sitelere verilen linklerden sorumlu değiliz</li>
                            <li>Ürün açıklamalarındaki hatalardan dolayı sipariş iptal edilebilir</li>
                            <li>Kullanıcıların birbirlerine verdikleri zararlardan sorumlu değiliz</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            8. Uyuşmazlıkların Çözümü
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Bu sözleşmeden doğan uyuşmazlıkların çözümünde İstanbul Mahkemeleri ve İcra
                            Daireleri yetkilidir. Tüketici hakem heyetlerine ve tüketici mahkemelerine
                            başvuru hakkınız saklıdır.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            9. Değişiklikler
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Lorinyo, bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkını
                            saklı tutar. Değişiklikler sitede yayınlandığı anda yürürlüğe girer.
                        </p>
                    </section>

                    <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                            İletişim
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Sorularınız için:{" "}
                            <a href="mailto:info@lorinyo.com" className="text-blue-600 hover:text-blue-700">
                                info@lorinyo.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
