import { Montserrat, Satisfy } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { fetchSettings } from "@/lib/api";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
});

export const metadata = {
  title: "Youthcamping | Your Story Starts Here",
  description: "Join the community of 10,000+ travelers. Authentic adventure experiences since 2019.",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchSettings();
  
  return (
    <html lang="en" className={`${montserrat.variable} ${satisfy.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-montserrat relative">
        <Navbar 
          logoUrl={settings?.navbar?.logoUrl} 
          navLinks={settings?.navbar?.links} 
        />
        <main className="flex-grow">{children}</main>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
