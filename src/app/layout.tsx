import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: "Budget Tracker",
  description: "Budget Tracker Web Appliction ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body>
      <header className="mb-2 flex px-5 items-center justify-between border-b py-4 md:mb-4 md:py-4 xl:mb-6">
            <nav className="text-xs gap-12 px-2 flex  lg:flex">
              <Link href={'/'} className="text-lg font-semibold text-gray-600 ">Home</Link>
              <Link href={'/show'} className="text-lg font-semibold text-gray-600 ">Show</Link>
              <Link href={'/addexp'} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-red-500 active:text-red-700">Add ➕</Link>
            </nav>
            </header>
        {children}
        <Toaster />
        </body>
    </html>
  );
}
