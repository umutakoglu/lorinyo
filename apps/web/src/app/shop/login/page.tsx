"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { LoadingButton } from "@/components/ui/Loading";

export default function LoginPage() {
    const router = useRouter();
    const { login, register } = useAuth();
    const { showToast } = useToast();

    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                // Login
                await login(email, password);
                showToast("success", "Giriş başarılı! Yönlendiriliyorsunuz...");
                setTimeout(() => router.push("/shop"), 1000);
            } else {
                // Register
                await register({ email, password, name, phone });
                showToast("success", "Kayıt başarılı! Hoş geldiniz!");
                setTimeout(() => router.push("/shop"), 1000);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message ||
                (isLogin ? "Giriş başarısız. Lütfen bilgilerinizi kontrol edin." : "Kayıt başarısız. Lütfen tekrar deneyin.");
            showToast("error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/shop" className="inline-block">
                        <div className="h-16 w-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4">
                            <span className="text-3xl font-bold text-blue-600">L</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Lorinyo</h1>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${isLogin
                                    ? "bg-blue-600 text-white"
                                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                }`}
                        >
                            Giriş Yap
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${!isLogin
                                    ? "bg-blue-600 text-white"
                                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                }`}
                        >
                            Kayıt Ol
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                                        Ad Soyad
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="Adınız Soyadınız"
                                        required={!isLogin}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                                        Telefon (Opsiyonel)
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="+90 555 123 4567"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                E-posta
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Şifre
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-zinc-600">Beni hatırla</span>
                                </label>
                                <Link href="/shop/forgot-password" className="text-blue-600 hover:text-blue-700">
                                    Şifremi unuttum
                                </Link>
                            </div>
                        )}

                        <LoadingButton
                            type="submit"
                            isLoading={isLoading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                            disabled={isLoading}
                        >
                            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                        </LoadingButton>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-zinc-600">
                            {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                {isLogin ? "Kayıt olun" : "Giriş yapın"}
                            </button>
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-zinc-200">
                        <Link
                            href="/shop"
                            className="block w-full py-3 border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-medium rounded-lg text-center transition-colors"
                        >
                            Alışverişe Devam Et
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white/70 text-sm mt-6">
                    © 2024 Lorinyo. Tüm hakları saklıdır.
                </p>
            </div>
        </div>
    );
}
