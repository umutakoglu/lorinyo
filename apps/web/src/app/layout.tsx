import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Lorinyo - Omni-Channel E-Commerce Platform',
    description: 'Centralized product, order, and marketplace management',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className={inter.className}>
                <ToastProvider>
                    <AuthProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </AuthProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
