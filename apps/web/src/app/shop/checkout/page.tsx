"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, MapPin, Truck, CheckCircle, User, Mail, Phone, Lock } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { apiClient } from "@/lib/api-client";
import { LoadingButton } from "@/components/ui/Loading";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCart();
    const { user, isAuthenticated, login, register } = useAuth();
    const { showToast } = useToast();

    const [step, setStep] = useState(0); // 0 = auth, 1 = address, 2 = shipping, 3 = payment
    const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "cash">("card");
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [shippingMethod, setShippingMethod] = useState<"standard" | "fast">("standard");

    // Auth form states
    const [authMode, setAuthMode] = useState<"login" | "register">("register");
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [authForm, setAuthForm] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
    });

    // Redirect if cart is empty
    if (items.length === 0) {
        router.push("/shop/cart");
        return null;
    }

    // Set initial step based on auth status
    if (isAuthenticated && step === 0) {
        setStep(1);
    }

    const shippingCost = shippingMethod === "fast" ? 49.9 : subtotal > 500 ? 0 : 29.9;
    const total = subtotal + shippingCost;

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuthLoading(true);

        try {
            if (authMode === "login") {
                await login(authForm.email, authForm.password);
                showToast("success", "Giriş başarılı!");
            } else {
                await register({
                    email: authForm.email,
                    password: authForm.password,
                    name: authForm.name,
                    phone: authForm.phone,
                });
                showToast("success", "Kayıt başarılı! Alışverişe devam edebilirsiniz.");
            }
            setStep(1); // Move to address step
        } catch (error: any) {
            showToast("error", error.response?.data?.message || "İşlem başarısız oldu");
        } finally {
            setIsAuthLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true);
        try {
            const order = await apiClient.orders.create({
                items: items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product?.price || 0,
                })),
                shippingAddress: "Mock Address - Ev, Atatürk Cad. No: 123 Daire: 4, Kadıköy, İstanbul",
                billingAddress: "Mock Address - Same as shipping",
                paymentMethod: paymentMethod.toUpperCase(),
                shippingMethod: shippingMethod.toUpperCase(),
            });

            await clearCart();
            showToast("success", "Siparişiniz başarıyla oluşturuldu!");
            router.push(`/shop/order/success?orderId=${order.id}`);
        } catch (error: any) {
            console.error("Order creation failed:", error);
            showToast("error", error.response?.data?.message || "Sipariş oluşturulurken bir hata oluştu");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header */}
            <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        {!isAuthenticated ? "Giriş Yap & Ödeme" : "Ödeme"}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Guest Auth Form */}
                {!isAuthenticated && step === 0 && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                                    Alışverişi Tamamlamak İçin
                                </h2>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Hızlı kayıt olun veya mevcut hesabınızla giriş yapın
                                </p>
                            </div>

                            {/* Tab Switcher */}
                            <div className="flex gap-2 mb-6 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg">
                                <button
                                    onClick={() => setAuthMode("register")}
                                    className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-colors ${authMode === "register"
                                            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                                        }`}
                                >
                                    Hızlı Kayıt
                                </button>
                                <button
                                    onClick={() => setAuthMode("login")}
                                    className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-colors ${authMode === "login"
                                            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                                        }`}
                                >
                                    Giriş Yap
                                </button>
                            </div>

                            <form onSubmit={handleAuthSubmit} className="space-y-4">
                                {authMode === "register" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                                <User className="inline h-4 w-4 mr-1" />
                                                Ad Soyad *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={authForm.name}
                                                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Adınız ve soyadınız"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                                <Phone className="inline h-4 w-4 mr-1" />
                                                Telefon *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={authForm.phone}
                                                onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="05XX XXX XX XX"
                                            />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        <Mail className="inline h-4 w-4 mr-1" />
                                        E-posta *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={authForm.email}
                                        onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="ornek@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        <Lock className="inline h-4 w-4 mr-1" />
                                        Şifre *
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={authForm.password}
                                        onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="En az 6 karakter"
                                        minLength={6}
                                    />
                                </div>

                                {authMode === "register" && (
                                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                                        ℹ️ Sepetinizdeki ürünler kayıt sonrası korunacaktır
                                    </div>
                                )}

                                <LoadingButton
                                    type="submit"
                                    isLoading={isAuthLoading}
                                    disabled={isAuthLoading}
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400"
                                >
                                    {authMode === "register" ? "Kayıt Ol & Devam Et" : "Giriş Yap & Devam Et"}
                                </LoadingButton>
                            </form>

                            <div className="mt-6 text-center">
                                <Link href="/shop/cart" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600">
                                    ← Sepete Dön
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Regular Checkout Flow (Only if authenticated) */}
                {isAuthenticated && step > 0 && (
                    <>
                        {/* Steps Indicator */}
                        <div className="mb-8 flex items-center justify-center gap-4">
                            {[
                                { num: 1, label: "Adres", icon: MapPin },
                                { num: 2, label: "Kargo", icon: Truck },
                                { num: 3, label: "Ödeme", icon: CreditCard },
                            ].map(({ num, label }) => (
                                <div key={num} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`h-12 w-12 rounded-full flex items-center justify-center font-bold ${step >= num
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                                                }`}
                                        >
                                            {step > num ? <CheckCircle className="h-6 w-6" /> : num}
                                        </div>
                                        <span className="text-sm mt-2 text-zinc-600 dark:text-zinc-400">{label}</span>
                                    </div>
                                    {num < 3 && (
                                        <div
                                            className={`h-1 w-24 mx-4 ${step > num ? "bg-blue-600" : "bg-zinc-200 dark:bg-zinc-800"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {step === 1 && (
                                    <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                                        <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
                                            Teslimat Adresi
                                        </h2>
                                        <div className="space-y-4 mb-6">
                                            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">Ev</h3>
                                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                            {user?.name || "Kullanıcı"}
                                                            <br />
                                                            Atatürk Cad. No: 123 Daire: 4<br />
                                                            Kadıköy, İstanbul 34710<br />
                                                            Tel: {user?.phone || "0532 123 45 67"}
                                                        </p>
                                                    </div>
                                                    <input type="radio" name="address" defaultChecked className="mt-1" />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setStep(2)}
                                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                                        >
                                            Devam Et
                                        </button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                                        <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
                                            Kargo Seçenekleri
                                        </h2>
                                        <div className="space-y-4 mb-6">
                                            <div
                                                onClick={() => setShippingMethod("standard")}
                                                className={`border rounded-lg p-4 cursor-pointer ${shippingMethod === "standard"
                                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                                        : "border-zinc-200 dark:border-zinc-800"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <input type="radio" checked={shippingMethod === "standard"} readOnly />
                                                        <div>
                                                            <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Standart Kargo</h3>
                                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                                3-5 iş günü içinde teslimat
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="font-bold text-green-600">
                                                        {subtotal > 500 ? "Ücretsiz" : "29.90 TL"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => setShippingMethod("fast")}
                                                className={`border rounded-lg p-4 cursor-pointer ${shippingMethod === "fast"
                                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                                        : "border-zinc-200 dark:border-zinc-800"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <input type="radio" checked={shippingMethod === "fast"} readOnly />
                                                        <div>
                                                            <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Hızlı Kargo</h3>
                                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                                                1-2 iş günü içinde teslimat
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="font-bold text-zinc-900 dark:text-zinc-50">49.90 TL</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="flex-1 py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                            >
                                                Geri
                                            </button>
                                            <button
                                                onClick={() => setStep(3)}
                                                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                                            >
                                                Devam Et
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                                        <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
                                            Ödeme Yöntemi
                                        </h2>

                                        <div className="space-y-4 mb-6">
                                            <div
                                                onClick={() => setPaymentMethod("card")}
                                                className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "card"
                                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                                        : "border-zinc-200 dark:border-zinc-800"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input type="radio" checked={paymentMethod === "card"} readOnly />
                                                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                                        Kredi/Banka Kartı
                                                    </span>
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => setPaymentMethod("transfer")}
                                                className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "transfer"
                                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                                        : "border-zinc-200 dark:border-zinc-800"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input type="radio" checked={paymentMethod === "transfer"} readOnly />
                                                    <span className="font-medium text-zinc-900 dark:text-zinc-50">Havale/EFT</span>
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => setPaymentMethod("cash")}
                                                className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "cash"
                                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                                        : "border-zinc-200 dark:border-zinc-800"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input type="radio" checked={paymentMethod === "cash"} readOnly />
                                                    <span className="font-medium text-zinc-900 dark:text-zinc-50">Kapıda Ödeme</span>
                                                </div>
                                            </div>
                                        </div>

                                        <label className="flex items-start gap-2 mb-6 text-sm text-zinc-700 dark:text-zinc-300">
                                            <input type="checkbox" className="mt-0.5" required />
                                            <span>
                                                <Link href="/shop/terms" className="text-blue-600 hover:underline">
                                                    Mesafeli Satış Sözleşmesi
                                                </Link>
                                                'ni ve{" "}
                                                <Link href="/shop/privacy" className="text-blue-600 hover:underline">
                                                    Ön Bilgilendirme Formu
                                                </Link>
                                                'nu okudum, onaylıyorum.
                                            </span>
                                        </label>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setStep(2)}
                                                className="flex-1 py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                            >
                                                Geri
                                            </button>
                                            <LoadingButton
                                                onClick={handlePlaceOrder}
                                                isLoading={isPlacingOrder}
                                                disabled={isPlacingOrder}
                                                className="flex-1 py-3 bg-green-600 text-white text-center rounded-lg font-medium hover:bg-green-700 disabled:bg-green-400"
                                            >
                                                Siparişi Tamamla
                                            </LoadingButton>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Order Summary Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sticky top-24">
                                    <h3 className="font-bold mb-4 text-zinc-900 dark:text-zinc-50">Sipariş Özeti</h3>
                                    <div className="space-y-3 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-600 dark:text-zinc-400">Ürünler ({items.length})</span>
                                            <span className="text-zinc-900 dark:text-zinc-50">
                                                {subtotal.toLocaleString("tr-TR")} TL
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-600 dark:text-zinc-400">Kargo</span>
                                            <span
                                                className={
                                                    shippingCost === 0
                                                        ? "text-green-600 font-medium"
                                                        : "text-zinc-900 dark:text-zinc-50"
                                                }
                                            >
                                                {shippingCost === 0 ? "Ücretsiz" : `${shippingCost.toFixed(2)} TL`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                        <span>Toplam</span>
                                        <span>{total.toLocaleString("tr-TR")} TL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
