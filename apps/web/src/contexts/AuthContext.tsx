"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api-client';

interface User {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    role: 'ADMIN' | 'CUSTOMER';
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    updateProfile: (data: UpdateProfileData) => Promise<void>;
}

interface RegisterData {
    email: string;
    password: string;
    name?: string;
    phone?: string;
}

interface UpdateProfileData {
    name?: string;
    phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                const token = localStorage.getItem('auth_token');

                if (storedUser && token) {
                    setUser(JSON.parse(storedUser));
                    // Optionally verify token with backend
                    try {
                        const profile = await apiClient.auth.getProfile();
                        setUser(profile);
                        localStorage.setItem('user', JSON.stringify(profile));
                    } catch (error) {
                        // Token invalid, clear storage
                        localStorage.removeItem('user');
                        localStorage.removeItem('auth_token');
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error('Failed to load user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await apiClient.auth.login(email, password);
            apiClient.setToken(response.token);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (data: RegisterData) => {
        try {
            const response = await apiClient.auth.register(data);
            apiClient.setToken(response.token);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        // Redirect to login page
        window.location.href = '/shop/login';
    };

    const updateProfile = async (data: UpdateProfileData) => {
        try {
            const updatedUser = await apiClient.auth.updateProfile(data);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Profile update failed:', error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
