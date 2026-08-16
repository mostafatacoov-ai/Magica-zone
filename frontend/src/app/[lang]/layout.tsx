import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "../../context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundMusic from "@/components/layout/BackgroundMusic";

export const metadata: Metadata = {
  title: "Magica Group",
  description: "Magica Group - Where human excellence begins. Educational camps, academy, mind games, and youth marketplace.",
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
    <div dir={dir} className={`antialiased ${fontClass} flex flex-col min-h-screen`}>
      <AuthProvider>
          <Navbar lang={params.lang} />
          <div className="flex-grow flex flex-col relative w-full">
            {children}
          </div>
          <Footer lang={params.lang} />
          <BackgroundMusic lang={params.lang} />
      </AuthProvider>
    </div>
  );
}
