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
            <div className="flex flex-col md:flex-row h-screen pt-20 md:pt-24 bg-gray-50 overflow-hidden">
                <Sidebar lang={params.lang} />
                <main className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-10 w-full overflow-x-hidden">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
