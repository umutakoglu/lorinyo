"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: "Sipariş ve Teslimat",
            questions: [
                {
                    q: "Siparişimi ne zaman teslim alacağım?",
                    a: "Siparişler onaylandıktan sonra 1-3 iş günü içinde kargoya verilir. Kargo süresi bulunduğunuz bölgeye göre 1-5 iş günü arasında değişmektedir."
                },
                {
                    q: "Kargo ücreti ne kadar?",
                    a: "500 TL ve üzeri alışverişlerde kargo ücretsizdir. 500 TL altındaki siparişlerde kargo ücreti 49,90 TL'dir."
                },
                {
                    q: "Siparişimi nasıl takip edebilirim?",
                    a: "Siparişiniz kargoya verildikten sonra e-posta adresinize gönderilen kargo takip numarası ile takip edebilirsiniz. Ayrıca 'Hesabım > Siparişlerim' bölümünden de takip yapabilirsiniz."
                },
                {
                    q: "Sipariş iptal edebilir miyim?",
                    a: "Siparişiniz henüz kargoya verilmediyse iptal edebilirsiniz. Kargoya verilen siparişler için iade süreci başlatabilirsiniz."
                }
            ]
        },
        {
            category: "İade ve Değişim",
            questions: [
                {
                    q: "Ürünü iade edebilir miyim?",
                    a: "Ürünü teslim aldıktan sonra 14 gün içinde ücretsiz iade hakkınız bulunmaktadır. Ürün kullanılmamış ve orijinal ambalajında olmalıdır."
                },
                {
                    q: "İade süreci ne kadar sürer?",
                    a: "İade ettiğiniz ürün depomıza ulaştıktan sonra 3-5 iş günü içinde kontrol edilir ve ödeme iadeniz gerçekleştirilir."
                },
                {
                    q: "Ürün değişimi yapabilir miyim?",
                    a: "Evet, aynı kategori içinde başka bir ürünle değişim yapabilirsiniz. Müşteri hizmetleriyle iletişime geçmeniz yeterlidir."
                }
            ]
        },
        {
            category: "Ödeme",
            questions: [
                {
                    q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
                    a: "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini sunuyoruz. Tüm ödeme işlemleri 256-bit SSL sertifikası ile güvence altındadır."
                },
                {
                    q: "Taksit yapabilir miyim?",
                    a: "Kredi kartı ile alışverişlerinizde bankanızın sunduğu taksit seçeneklerinden yararlanabilirsiniz."
                },
                {
                    q: "Fatura nasıl alırım?",
                    a: "Bireysel faturanız siparişinizle birlikte gönderilir. Kurumsal fatura için sipariş sırasında firma bilgilerinizi girmeniz gerekmektedir."
                }
            ]
        },
        {
            category: "Hesap ve Üyelik",
            questions: [
                {
                    q: "Üye olmadan alışveriş yapabilir miyim?",
                    a: "Hayır, güvenli alışveriş deneyimi için üyelik zorunludur. Üyelik işlemi çok kısa sürmektedir."
                },
                {
                    q: "Şifremi unuttum, ne yapmalıyım?",
                    a: "Giriş sayfasındaki 'Şifremi Unuttum' linkine tıklayarak e-posta adresinize şifre sıfırlama linki gönderebilirsiniz."
                },
                {
                    q: "Hesabımı nasıl silerim?",
                    a: "Hesabınızı silmek için müşteri hizmetleriyle iletişime geçmeniz gerekmektedir."
                }
            ]
        },
        {
            category: "Ürün ve Stok",
            questions: [
                {
                    q: "Stokta olmayan ürünü sipariş edebilir miyim?",
                    a: "Stokta olmayan ürünler için 'Stokta olunca haber ver' özelliğini kullanabilirsiniz. Ürün stoğa girdiğinde size e-posta gönderilir."
                },
                {
                    q: "Ürünler orijinal mi?",
                    a: "Tüm ürünlerimiz orijinaldir ve yetkili distribütörlerden temin edilmektedir. Garantili ürünlerimiz resmi servis garantisi altındadır."
                },
                {
                    q: "Fiyatlar KDV dahil mi?",
                    a: "Evet, sitemizdeki tüm fiyatlar KDV dahildir."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Sıkça Sorulan Sorular</h1>
                    <p className="text-xl text-blue-100">
                        Aradığınız cevapları bulun
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex} className="mb-12">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                                {category.category}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, qIndex) => {
                                    const globalIndex = catIndex * 100 + qIndex;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div
                                            key={qIndex}
                                            className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                <span className="font-medium text-left text-zinc-900 dark:text-zinc-50">
                                                    {faq.q}
                                                </span>
                                                {isOpen ? (
                                                    <Minus className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                                ) : (
                                                    <Plus className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                                                )}
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
                                                    <p className="text-zinc-600 dark:text-zinc-400">{faq.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Contact CTA */}
                    <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900 text-center">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                            Aradığınızı bulamadınız mı?
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                            Müşteri hizmetleri ekibimiz size yardımcı olmaktan mutluluk duyar
                        </p>
                        <div className="flex gap-4 justify-center">
                            <a
                                href="/shop/contact"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Bize Ulaşın
                            </a>
                            <a
                                href="tel:08501234567"
                                className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium rounded-lg transition-colors"
                            >
                                0850 123 4567
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
