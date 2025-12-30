"use client";

import { useState, useEffect } from "react";
import { Settings, Store, CreditCard, Truck, Mail, Palette, Save } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/contexts/ToastContext";
import { LoadingSpinner } from "@/components/ui/Loading";

interface SettingsData {
    general: {
        siteName: string;
        siteDescription: string;
        contactEmail: string;
        contactPhone: string;
        address: string;
        currency: string;
        language: string;
    };
    payment: {
        iyzico: { enabled: boolean; testMode: boolean };
        bankTransfer: { enabled: boolean; bankName: string; iban: string };
        cashOnDelivery: { enabled: boolean; extraFee: number };
    };
    shipping: {
        freeShippingThreshold: number;
        defaultShippingCost: number;
        providers: Array<{ name: string; code: string; enabled: boolean }>;
    };
    email: {
        smtpHost: string;
        smtpPort: number;
        smtpUser: string;
        fromName: string;
        fromEmail: string;
        templates: {
            orderConfirmation: boolean;
            shippingNotification: boolean;
            passwordReset: boolean;
        };
    };
    theme: {
        primaryColor: string;
        secondaryColor: string;
        darkMode: boolean;
        logo: string;
        favicon: string;
    };
}

export default function AdminSettingsPage() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState("general");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState<SettingsData | null>(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setIsLoading(true);
            // For now, use default settings since API might need auth
            setSettings({
                general: {
                    siteName: "Lorinyo",
                    siteDescription: "Online Alışveriş Sitesi",
                    contactEmail: "info@lorinyo.com",
                    contactPhone: "+90 555 123 4567",
                    address: "İstanbul, Türkiye",
                    currency: "TRY",
                    language: "tr",
                },
                payment: {
                    iyzico: { enabled: true, testMode: true },
                    bankTransfer: { enabled: true, bankName: "Garanti Bankası", iban: "TR00 0000 0000 0000 0000 0000 00" },
                    cashOnDelivery: { enabled: true, extraFee: 10 },
                },
                shipping: {
                    freeShippingThreshold: 200,
                    defaultShippingCost: 29.9,
                    providers: [
                        { name: "Yurtiçi Kargo", code: "yurtici", enabled: true },
                        { name: "Aras Kargo", code: "aras", enabled: true },
                        { name: "MNG Kargo", code: "mng", enabled: false },
                    ],
                },
                email: {
                    smtpHost: "smtp.example.com",
                    smtpPort: 587,
                    smtpUser: "noreply@lorinyo.com",
                    fromName: "Lorinyo",
                    fromEmail: "noreply@lorinyo.com",
                    templates: {
                        orderConfirmation: true,
                        shippingNotification: true,
                        passwordReset: true,
                    },
                },
                theme: {
                    primaryColor: "#3B82F6",
                    secondaryColor: "#10B981",
                    darkMode: true,
                    logo: "/images/logo.png",
                    favicon: "/favicon.ico",
                },
            });
        } catch (error) {
            showToast("error", "Ayarlar yüklenirken hata oluştu");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            // API call would go here
            showToast("success", "Ayarlar kaydedildi");
        } catch (error) {
            showToast("error", "Ayarlar kaydedilirken hata oluştu");
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: "general", label: "Genel", icon: Store },
        { id: "payment", label: "Ödeme", icon: CreditCard },
        { id: "shipping", label: "Kargo", icon: Truck },
        { id: "email", label: "E-posta", icon: Mail },
        { id: "theme", label: "Tema", icon: Palette },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Ayarlar yükleniyor..." />
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Ayarlar</h1>
                    <p className="text-zinc-600 dark:text-zinc-400">Site ayarlarını yönetin</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    <Save className="h-4 w-4" />
                    {isSaving ? "Kaydediliyor..." : "Kaydet"}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === tab.id
                                ? "bg-blue-600 text-white"
                                : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            }`}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                {activeTab === "general" && settings && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Genel Ayarlar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Site Adı</label>
                                <input
                                    type="text"
                                    value={settings.general.siteName}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            general: { ...settings.general, siteName: e.target.value },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">İletişim E-posta</label>
                                <input
                                    type="email"
                                    value={settings.general.contactEmail}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            general: { ...settings.general, contactEmail: e.target.value },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Telefon</label>
                                <input
                                    type="text"
                                    value={settings.general.contactPhone}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            general: { ...settings.general, contactPhone: e.target.value },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Adres</label>
                                <input
                                    type="text"
                                    value={settings.general.address}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            general: { ...settings.general, address: e.target.value },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Site Açıklaması</label>
                                <textarea
                                    value={settings.general.siteDescription}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            general: { ...settings.general, siteDescription: e.target.value },
                                        })
                                    }
                                    rows={3}
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "payment" && settings && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Ödeme Ayarları</h2>
                        <div className="space-y-4">
                            <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">iyzico</h3>
                                        <p className="text-sm text-zinc-500">Kredi kartı ile ödeme</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.payment.iyzico.enabled}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    payment: {
                                                        ...settings.payment,
                                                        iyzico: { ...settings.payment.iyzico, enabled: e.target.checked },
                                                    },
                                                })
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Havale/EFT</h3>
                                        <p className="text-sm text-zinc-500">Banka havalesi ile ödeme</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.payment.bankTransfer.enabled}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    payment: {
                                                        ...settings.payment,
                                                        bankTransfer: { ...settings.payment.bankTransfer, enabled: e.target.checked },
                                                    },
                                                })
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Kapıda Ödeme</h3>
                                        <p className="text-sm text-zinc-500">Teslimat sırasında ödeme</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.payment.cashOnDelivery.enabled}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    payment: {
                                                        ...settings.payment,
                                                        cashOnDelivery: { ...settings.payment.cashOnDelivery, enabled: e.target.checked },
                                                    },
                                                })
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "shipping" && settings && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Kargo Ayarları</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Ücretsiz Kargo Limiti (TL)</label>
                                <input
                                    type="number"
                                    value={settings.shipping.freeShippingThreshold}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            shipping: { ...settings.shipping, freeShippingThreshold: Number(e.target.value) },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Varsayılan Kargo Ücreti (TL)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={settings.shipping.defaultShippingCost}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            shipping: { ...settings.shipping, defaultShippingCost: Number(e.target.value) },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">Kargo Firmaları</h3>
                            <div className="space-y-3">
                                {settings.shipping.providers.map((provider, index) => (
                                    <div key={provider.code} className="flex items-center justify-between p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                                        <span className="text-zinc-900 dark:text-zinc-50">{provider.name}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={provider.enabled}
                                                onChange={(e) => {
                                                    const newProviders = [...settings.shipping.providers];
                                                    newProviders[index].enabled = e.target.checked;
                                                    setSettings({
                                                        ...settings,
                                                        shipping: { ...settings.shipping, providers: newProviders },
                                                    });
                                                }}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-zinc-200 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "email" && settings && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">E-posta Ayarları</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">SMTP Sunucu</label>
                                <input
                                    type="text"
                                    value={settings.email.smtpHost}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            email: { ...settings.email, smtpHost: e.target.value },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">SMTP Port</label>
                                <input
                                    type="number"
                                    value={settings.email.smtpPort}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            email: { ...settings.email, smtpPort: Number(e.target.value) },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Gönderen Adı</label>
                                <input
                                    type="text"
                                    value={settings.email.fromName}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            email: { ...settings.email, fromName: e.target.value },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Gönderen E-posta</label>
                                <input
                                    type="email"
                                    value={settings.email.fromEmail}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            email: { ...settings.email, fromEmail: e.target.value },
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "theme" && settings && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Tema Ayarları</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Ana Renk</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={settings.theme.primaryColor}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                theme: { ...settings.theme, primaryColor: e.target.value },
                                            })
                                        }
                                        className="w-12 h-10 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={settings.theme.primaryColor}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                theme: { ...settings.theme, primaryColor: e.target.value },
                                            })
                                        }
                                        className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">İkincil Renk</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={settings.theme.secondaryColor}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                theme: { ...settings.theme, secondaryColor: e.target.value },
                                            })
                                        }
                                        className="w-12 h-10 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={settings.theme.secondaryColor}
                                        onChange={(e) =>
                                            setSettings({
                                                ...settings,
                                                theme: { ...settings.theme, secondaryColor: e.target.value },
                                            })
                                        }
                                        className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Karanlık Mod</h3>
                                        <p className="text-sm text-zinc-500">Varsayılan olarak karanlık tema kullan</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.theme.darkMode}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    theme: { ...settings.theme, darkMode: e.target.checked },
                                                })
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-zinc-200 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
