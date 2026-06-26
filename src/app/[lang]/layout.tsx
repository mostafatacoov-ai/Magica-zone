import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "../../context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "Magic Camp",
  description: "Educational summer camp for kids aged 5 to 15.",
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
  const fontClass = params.lang === "ar" ? cairo.variable : inter.variable;

  return (
    <html lang={params.lang} dir={dir} className={fontClass}>
      <body className="font-sans antialiased">
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
