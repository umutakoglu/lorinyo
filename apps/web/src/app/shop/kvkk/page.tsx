export default function KVKKPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">KVKK Aydınlatma Metni</h1>
                    <p className="text-xl text-blue-100">
                        Kişisel Verilerin Korunması Kanunu
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            1. Veri Sorumlusu
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel
                            verileriniz; veri sorumlusu olarak Lorinyo E-Ticaret A.Ş. tarafından aşağıda
                            açıklanan kapsamda işlenebilecektir.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            2. Kişisel Verilerin İşlenme Amaçları
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>E-ticaret faaliyetlerinin yürütülmesi</li>
                            <li>Sipariş ve teslimat süreçlerinin gerçekleştirilmesi</li>
                            <li>Müşteri memnuniyeti aktivitelerinin planlanması ve icrası</li>
                            <li>Ürün ve hizmetlerin pazarlama süreçlerinin planlanması</li>
                            <li>Şirket faaliyetlerinin mevzuata uygun yürütülmesi</li>
                            <li>Finans ve muhasebe işlemlerinin yürütülmesi</li>
                            <li>Hukuk işlerinin takibi ve yürütülmesi</li>
                            <li>İletişim faaliyetlerinin yürütülmesi</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            3. İşlenen Kişisel Veri Kategorileri
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li><strong>Kimlik Bilgisi:</strong> Ad, soyad, T.C. kimlik numarası (fatura için)</li>
                            <li><strong>İletişim Bilgisi:</strong> Telefon, e-posta, adres</li>
                            <li><strong>Müşteri İşlem Bilgisi:</strong> Sipariş geçmişi, sepet bilgileri</li>
                            <li><strong>İşlem Güvenliği Bilgisi:</strong> IP adresi, çerez kayıtları</li>
                            <li><strong>Finansal Bilgi:</strong> IBAN, kredi kartı bilgileri (şifrelenmiş)</li>
                            <li><strong>Pazarlama Bilgisi:</strong> Alışkanlıklar, tercihler</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            4. Kişisel Verilerin Aktarılması
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            Toplanan kişisel verileriniz aşağıdaki kişi ve kuruluşlara aktarılabilir:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>Kargo ve lojistik firmaları (teslimat için)</li>
                            <li>Ödeme kuruluşları ve bankalar</li>
                            <li>Yasal otoriteler (yasal zorunluluk halinde)</li>
                            <li>İş ortakları ve tedarikçiler</li>
                            <li>Hukuk danışmanları ve denetçiler</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            Kişisel verileriniz, web sitesi, mobil uygulama, çağrı merkezi, e-posta ve benzeri
                            yöntemlerle sözlü, yazılı veya elektronik ortamda toplanmaktadır.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            KVKK'nın 5. ve 6. maddelerinde belirtilen; bir sözleşmenin kurulması veya ifasıyla
                            doğrudan doğruya ilgili olması, veri sorumlusunun hukuki yükümlülüğünü yerine
                            getirebilmesi için zorunlu olması, açık rızanızın bulunması gibi hukuki sebeplere
                            dayanılarak işlenmektedir.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            6. Kişisel Veri Sahibinin Hakları
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                            KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                            <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                            <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                            <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                            <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                            <li>Düzeltme, silme ve yok edilme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                            <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            7. Başvuru Yöntemi
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici gerekli
                            bilgiler ve kullanmak istediğiniz hakkınıza yönelik açıklamalarınızla birlikte
                            talebinizi;
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 mt-4">
                            <li>
                                <strong>E-posta:</strong>{" "}
                                <a href="mailto:kvkk@lorinyo.com" className="text-blue-600 hover:text-blue-700">
                                    kvkk@lorinyo.com
                                </a>
                            </li>
                            <li>
                                <strong>Posta:</strong> Maslak Mahallesi, Bilim Sokak No:5, Sarıyer/İstanbul
                            </li>
                            <li>
                                <strong>Başvuru formu:</strong> İmzalı başvuru formunuzu ıslak imzalı şekilde
                                posta yoluyla veya noter aracılığıyla gönderebilirsiniz
                            </li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            <strong>Not:</strong> Başvurularınız en geç 30 gün içinde ücretsiz olarak
                            sonuçlandırılacaktır. Ancak, işlemin ayrıca bir maliyet gerektirmesi hâlinde,
                            Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret
                            alınabilecektir.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
