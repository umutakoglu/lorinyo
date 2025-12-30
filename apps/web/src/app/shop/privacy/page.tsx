export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Gizlilik Politikası</h1>
                    <p className="text-xl text-blue-100">
                        Son Güncellenme: 25 Aralık 2024
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            1. Giriş
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Lorinyo olarak kişisel verilerinizin güvenliği bizim için son derece önemlidir.
                            Bu gizlilik politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını
                            ve korunduğunu açıklar.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            2. Toplanan Bilgiler
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            Aşağıdaki kişisel bilgiler toplanmaktadır:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>Ad, soyad</li>
                            <li>E-posta adresi</li>
                            <li>Telefon numarası</li>
                            <li>Teslimat ve fatura adresi</li>
                            <li>Ödeme bilgileri (şifrelenmiş olarak)</li>
                            <li>IP adresi ve çerez bilgileri</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            3. Bilgilerin Kullanımı
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            Toplanan bilgiler şu amaçlarla kullanılır:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>Sipariş işlemlerinin gerçekleştirilmesi</li>
                            <li>Müşteri hizmetleri desteği sağlanması</li>
                            <li>Kampanya ve duyurular gönderilmesi (onay verilmişse)</li>
                            <li>Site deneyiminin iyileştirilmesi</li>
                            <li>Güvenlik ve dolandırıcılık önleme</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            4. Çerezler (Cookies)
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır.
                            Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz. Ancak çerezleri devre dışı
                            bırakmanız durumunda bazı site özelliklerinden faydalanamayabilirsiniz.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            5. Bilgi Güvenliği
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Kişisel verileriniz, 256-bit SSL sertifikası ile şifrelenerek korunmaktadır.
                            Ödeme bilgileriniz asla sistemimizde saklanmaz ve güvenli ödeme altyapısı
                            üzerinden işlenir.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            6. Üçüncü Taraflarla Paylaşım
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Kişisel bilgileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.
                            Sadece sipariş teslimatı için kargo firmaları ve ödeme işlemleri için ödeme
                            sağlayıcıları ile sınırlı bilgi paylaşılır.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            7. Haklarınız
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            KVKK kapsamında aşağıdaki haklara sahipsiniz:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                            <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
                            <li>İşlemeye itiraz etme</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            8. İletişim
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Gizlilik politikamız hakkında sorularınız için{" "}
                            <a href="mailto:kvkk@lorinyo.com" className="text-blue-600 hover:text-blue-700">
                                kvkk@lorinyo.com
                            </a>{" "}
                            adresinden bize ulaşabilirsiniz.
                        </p>
                    </section>

                    <div className="mt-12 p-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler
                            olduğunda size bildirim yapılacaktır.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
