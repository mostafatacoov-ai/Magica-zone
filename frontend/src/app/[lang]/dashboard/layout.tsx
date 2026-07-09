import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { lang: string };
}>) {
    return (
        <ProtectedRoute lang={params.lang}>
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                <Sidebar lang={params.lang} />
                <main className="flex-1 overflow-y-auto p-6 md:p-10">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
