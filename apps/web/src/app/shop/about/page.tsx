import Link from "next/link";
import { Target, Users, Award, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Hakkımızda</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Türkiye'nin önde gelen e-ticaret platformu
                    </p>
                </div>
            </div>

            {/* Story */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                        Hikayemiz
                    </h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-4">
                            Lorinyo, 2024 yılında müşterilerimize en kaliteli ürünleri en uygun fiyatlarla sunmak
                            amacıyla kuruldu. Misyonumuz, online alışverişi daha kolay, güvenli ve keyifli hale getirmektir.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-4">
                            Elektronikten modaya, ev dekorasyonundan hobiye kadar geniş bir ürün yelpazesi sunuyoruz.
                            Müşteri memnuniyeti bizim için her şeyden önce gelir.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                            Hızlı kargo, kolay iade ve 7/24 müşteri desteğimizle yanınızdayız.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-zinc-50 dark:bg-zinc-900 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-12">
                        Değerlerimiz
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                Kalite
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                En kaliteli ürünleri titizlikle seçiyoruz
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                Müşteri Odaklılık
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Müşterilerimizin memnuniyeti önceliğimiz
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                Güvenilirlik
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Güvenli alışveriş deneyimi sunuyoruz
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                Tutku
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                İşimizi sevgiyle yapıyoruz
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                        <div className="text-zinc-600 dark:text-zinc-400">Mutlu Müşteri</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
                        <div className="text-zinc-600 dark:text-zinc-400">Ürün Çeşidi</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                        <div className="text-zinc-600 dark:text-zinc-400">Müşteri Desteği</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">%99</div>
                        <div className="text-zinc-600 dark:text-zinc-400">Memnuniyet Oranı</div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Alışverişe Başlamaya Hazır mısınız?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Binlerce ürün arasından size en uygun olanı bulun
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Ürünlere Göz Atın
                    </Link>
                </div>
            </div>
        </div>
    );
}
