"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { apiClient } from '@/lib/api-client';

interface CartItem {
    id: string;
    productId: string;
    product: any;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    isLoading: boolean;
    addItem: (productId: string, quantity?: number) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CART_STORAGE_KEY = 'lorinyo_guest_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Load cart on mount
    useEffect(() => {
        if (isAuthenticated) {
            // Load from API for authenticated users
            refreshCart();
        } else {
            // Load from localStorage for guest users
            loadGuestCart();
        }
    }, [isAuthenticated]);

    // Calculate totals whenever items change
    useEffect(() => {
        const total = items.reduce((sum, item) => {
            const price = item.product?.price || 0;
            return sum + (price * item.quantity);
        }, 0);
        setSubtotal(total);

        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        setItemCount(count);
    }, [items]);

    const loadGuestCart = () => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                const guestCart = JSON.parse(stored);
                setItems(guestCart);
            }
        } catch (error) {
            console.error('Failed to load guest cart:', error);
        }
    };

    const saveGuestCart = (cartItems: CartItem[]) => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to save guest cart:', error);
        }
    };

    const refreshCart = async () => {
        if (!isAuthenticated) return;

        setIsLoading(true);
        try {
            const data = await apiClient.cart.get();
            setItems(data.items || []);
        } catch (error) {
            console.error('Failed to refresh cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addItem = async (productId: string, quantity: number = 1) => {
        setIsLoading(true);
        try {
            if (isAuthenticated) {
                // Add to API cart
                await apiClient.cart.add({ productId, quantity });
                await refreshCart();
            } else {
                // Add to guest cart (localStorage)
                const existingItemIndex = items.findIndex(
                    item => item.productId === productId
                );

                let newItems: CartItem[];
                if (existingItemIndex >= 0) {
                    // Update existing item
                    newItems = [...items];
                    newItems[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item (mock product data - will be fetched from API in real impl)
                    const newItem: CartItem = {
                        id: `guest-${Date.now()}`,
                        productId,
                        quantity,
                        product: { id: productId, price: 0 } // Placeholder
                    };
                    newItems = [...items, newItem];
                }

                setItems(newItems);
                saveGuestCart(newItems);
            }
        } catch (error) {
            console.error('Failed to add item:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        setIsLoading(true);
        try {
            if (isAuthenticated) {
                await apiClient.cart.update(itemId, { quantity });
                await refreshCart();
            } else {
                // Update guest cart
                const newItems = items.map(item =>
                    item.id === itemId ? { ...item, quantity } : item
                );
                setItems(newItems);
                saveGuestCart(newItems);
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const removeItem = async (itemId: string) => {
        setIsLoading(true);
        try {
            if (isAuthenticated) {
                await apiClient.cart.remove(itemId);
                await refreshCart();
            } else {
                // Remove from guest cart
                const newItems = items.filter(item => item.id !== itemId);
                setItems(newItems);
                saveGuestCart(newItems);
            }
        } catch (error) {
            console.error('Failed to remove item:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const clearCart = async () => {
        setIsLoading(true);
        try {
            if (isAuthenticated) {
                await apiClient.cart.clear();
            } else {
                localStorage.removeItem(CART_STORAGE_KEY);
            }
            setItems([]);
        } catch (error) {
            console.error('Failed to clear cart:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const value: CartContextType = {
        items,
        itemCount,
        subtotal,
        isLoading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
