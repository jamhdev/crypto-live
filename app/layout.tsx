"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navigation/NavBar";
import AppContextProvider from "./contexts/AppContext";
import { ReactNode } from "react";
import HomeChartSection from "./components/home-chart-section/HomeChartSection";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppContextProvider>
        <BodyWapper>
          <NavBar />
          <HomeChartSection />
          {children}
        </BodyWapper>
      </AppContextProvider>
    </html>
  );
}

function BodyWapper({ children }: { children: ReactNode }) {
  return (
    <>
      <body
        className={`${inter.className} bg-background max-w-[1440px] flex justify-center items-center flex-col m-auto`}
      >
        {children}
      </body>
    </>
  );
}
