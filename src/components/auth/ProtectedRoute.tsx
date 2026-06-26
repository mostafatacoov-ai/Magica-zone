"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ 
    children, 
    lang 
}: { 
    children: React.ReactNode, 
    lang: string 
}) {
    const { user, status, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push(`/${lang}/login`);
            }
        }
    }, [user, loading, router, lang]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-orange-50">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (status === "pending_approval") {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-orange-50 text-center p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {lang === 'ar' ? "حسابك قيد المراجعة" : "Account Pending Approval"}
                </h1>
                <p className="text-gray-600 max-w-md">
                    {lang === 'ar' 
                        ? "شكراً لتسجيلك! سيقوم المسؤول بمراجعة حسابك وتفعيله قريباً."
                        : "Thank you for registering! An admin will review and approve your account shortly."}
                </p>
            </div>
        );
    }

    return <>{children}</>;
}
