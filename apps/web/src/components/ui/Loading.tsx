"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    fullScreen?: boolean;
}

const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
};

export function LoadingSpinner({
    size = "md",
    text,
    fullScreen = false
}: LoadingSpinnerProps) {
    const spinner = (
        <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
            {text && <p className="text-sm text-zinc-600 dark:text-zinc-400">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-zinc-950/80">
                {spinner}
            </div>
        );
    }

    return spinner;
}

export function LoadingButton({
    isLoading,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
    return (
        <button {...props} disabled={isLoading || props.disabled}>
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {children}
                </span>
            ) : (
                children
            )}
        </button>
    );
}
