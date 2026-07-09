import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "../../context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Magica Camp",
  description: "Educational summer camp for kids aged 5 to 15.",
  icons: {
    icon: '/icon.png',
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const dir = params.lang === "ar" ? "rtl" : "ltr";
  const fontClass = params.lang === "ar" ? "font-cairo" : "font-inter";

  return (
    <html lang={params.lang} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased ${fontClass} flex flex-col min-h-screen`}>
        <AuthProvider>
            <Navbar lang={params.lang} />
            <div className="flex-grow flex flex-col relative w-full">
              {children}
            </div>
            <Footer lang={params.lang} />
        </AuthProvider>
      </body>
    </html>
  );
}
