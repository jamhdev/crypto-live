"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContextProvider, { AppContext } from "./contexts/AppContext";
import { ReactNode, useContext, useEffect } from "react";
import { StoreProvider } from "./store/StoreProvider";
import MainBody from "./components/MainBody/MainBody";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppContextProvider>
        <StoreProvider>
          <BodyWrapper>
            <MainBody />
            {children}
          </BodyWrapper>
        </StoreProvider>
      </AppContextProvider>
    </html>
  );
}

function BodyWrapper({ children }: { children: ReactNode }) {
  return (
    <body
      className={`${inter.className} bg-background max-w-[1440px] m-auto overflow-x-hidden`}
    >
      <div className="flex justify-center items-center flex-col m-auto px-4 md:px-8 lg:px-10">
        {children}
      </div>
    </body>
  );
}
