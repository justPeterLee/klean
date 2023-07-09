import "./globals.css";
import { Inter } from "next/font/google";

import AuthProvider from "./AuthProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { BackDrop } from "@/components/ClientContext";

import dynamic from "next/dynamic";
import ClientContextProvider from "@/components/ClientContext";
import FavoriteContextProvider from "@/components/Context/FavoriteContext";
const inter = Inter({ subsets: ["latin"] });

const Cart = dynamic(() => import("@/components/Cart/Cart"));

export const metadata = {
  title: "Klean",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <ClientContextProvider>
          <FavoriteContextProvider>
            <Cart />
            <BackDrop />
            <Navbar />
            {children}
            <Footer />
          </FavoriteContextProvider>
        </ClientContextProvider>
      </html>
    </AuthProvider>
  );
}
