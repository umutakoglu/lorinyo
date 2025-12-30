import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3101/api';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor - Add auth token
        this.client.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor - Handle errors
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    // Unauthorized - clear token and redirect to login
                    this.clearToken();
                    if (typeof window !== 'undefined') {
                        window.location.href = '/shop/login';
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    private getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('auth_token');
    }

    private clearToken(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }

    public setToken(token: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem('auth_token', token);
    }

    // Generic request methods
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.put<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.delete<T>(url, config);
        return response.data;
    }

    // Auth endpoints
    auth = {
        login: (email: string, password: string) =>
            this.post<{ user: any; token: string }>('/auth/login', { email, password }),

        register: (data: { email: string; password: string; name?: string; phone?: string }) =>
            this.post<{ user: any; token: string }>('/auth/register', data),

        getProfile: () =>
            this.get<any>('/auth/profile'),

        updateProfile: (data: { name?: string; phone?: string }) =>
            this.put<any>('/auth/profile', data),

        changePassword: (oldPassword: string, newPassword: string) =>
            this.post<{ message: string }>('/auth/change-password', { oldPassword, newPassword }),
    };

    // Products endpoints
    products = {
        getAll: (params?: any) =>
            this.get<{ data: any[]; meta: any }>('/products', { params }),

        getBySlug: (slug: string) =>
            this.get<any>(`/products/${slug}`),

        create: (data: any) =>
            this.post<any>('/products', data),

        update: (id: string, data: any) =>
            this.put<any>(`/products/${id}`, data),

        delete: (id: string) =>
            this.delete<void>(`/products/${id}`),

        getRelated: (id: string) =>
            this.get<any[]>(`/products/${id}/related`),
    };

    // Categories endpoints
    categories = {
        getAll: () =>
            this.get<any[]>('/categories'),

        getBySlug: (slug: string) =>
            this.get<any>(`/categories/${slug}`),

        create: (data: any) =>
            this.post<any>('/categories', data),

        update: (id: string, data: any) =>
            this.put<any>(`/categories/${id}`, data),

        delete: (id: string) =>
            this.delete<void>(`/categories/${id}`),
    };

    // Cart endpoints
    cart = {
        get: () =>
            this.get<{ items: any[]; subtotal: number; itemCount: number }>('/cart'),

        add: (productId: string, quantity: number = 1) =>
            this.post<any>('/cart', { productId, quantity }),

        updateQuantity: (itemId: string, quantity: number) =>
            this.put<any>(`/cart/${itemId}`, { quantity }),

        remove: (itemId: string) =>
            this.delete<{ message: string }>(`/cart/${itemId}`),

        clear: () =>
            this.delete<{ message: string }>('/cart'),
    };

    // Orders endpoints
    orders = {
        create: (data: { addressId: string; paymentMethod: string; notes?: string }) =>
            this.post<any>('/orders', data),

        getAll: () =>
            this.get<any[]>('/orders'),

        getById: (id: string) =>
            this.get<any>(`/orders/${id}`),

        getStats: () =>
            this.get<{ totalOrders: number; totalSpent: number; pendingOrders: number }>('/orders/stats'),

        updateStatus: (id: string, status: string) =>
            this.put<any>(`/orders/${id}/status`, { status }),
    };

    // Reviews endpoints
    reviews = {
        getProductReviews: (productId: string) =>
            this.get<{ reviews: any[]; stats: any }>(`/reviews/product/${productId}`),

        create: (data: { productId: string; rating: number; title?: string; comment?: string }) =>
            this.post<any>('/reviews', data),

        getMyReviews: () =>
            this.get<any[]>('/reviews/my-reviews'),

        update: (id: string, data: any) =>
            this.put<any>(`/reviews/${id}`, data),

        delete: (id: string) =>
            this.delete<{ message: string }>(`/reviews/${id}`),
    };

    // Favorites endpoints
    favorites = {
        getAll: () =>
            this.get<any[]>('/favorites'),

        add: (productId: string) =>
            this.post<any>(`/favorites/${productId}`),

        remove: (productId: string) =>
            this.delete<{ message: string }>(`/favorites/${productId}`),

        toggle: (productId: string) =>
            this.post<{ message: string; isFavorite: boolean }>(`/favorites/${productId}/toggle`),

        check: (productId: string) =>
            this.get<{ isFavorite: boolean }>(`/favorites/${productId}/check`),
    };

    // Users endpoints (Admin only)
    users = {
        getAll: (role?: string) =>
            this.get<any[]>(`/users${role ? `?role=${role}` : ''}`),

        getById: (id: string) =>
            this.get<any>(`/users/${id}`),

        getCustomers: () =>
            this.get<any[]>('/users/customers/list'),

        updateRole: (id: string, role: string) =>
            this.put<any>(`/users/${id}/role`, { role }),

        delete: (id: string) =>
            this.delete<{ message: string }>(`/users/${id}`),
    };

    // Settings endpoints (Admin only)
    settings = {
        getAll: () =>
            this.get<any>('/settings'),

        updateGeneral: (data: any) =>
            this.put<any>('/settings/general', data),

        updatePayment: (data: any) =>
            this.put<any>('/settings/payment', data),

        updateShipping: (data: any) =>
            this.put<any>('/settings/shipping', data),

        updateEmail: (data: any) =>
            this.put<any>('/settings/email', data),

        updateTheme: (data: any) =>
            this.put<any>('/settings/theme', data),
    };

    // File Upload
    upload = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return this.post<{ url: string; filename: string }>('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for better TypeScript support
export type { AxiosError };

