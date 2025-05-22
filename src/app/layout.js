import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "Artistas e Albuns de Front-End",
    icons: {
    icon: "/icons/favicon.ico",
  },
    description: "Avaliação de uma API sobre Artistas e Albuns de Front-End",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
