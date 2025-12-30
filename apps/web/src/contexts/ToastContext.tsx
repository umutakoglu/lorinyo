"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (type: ToastType, message: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: Toast = { id, type, message };

        setToasts((prev) => [...prev, newToast]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex items-start gap-3 p-4 rounded-lg shadow-lg min-w-[300px] max-w-md animate-in slide-in-from-right ${toast.type === 'success' ? 'bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-900' :
                                toast.type === 'error' ? 'bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-900' :
                                    'bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-900'
                            }`}
                    >
                        {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />}
                        {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />}
                        {toast.type === 'info' && <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />}

                        <p className={`flex-1 text-sm ${toast.type === 'success' ? 'text-green-900 dark:text-green-100' :
                                toast.type === 'error' ? 'text-red-900 dark:text-red-100' :
                                    'text-blue-900 dark:text-blue-100'
                            }`}>
                            {toast.message}
                        </p>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
