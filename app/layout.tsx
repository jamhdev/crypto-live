import { Inter } from "next/font/google";
import "./globals.css";
import AppContextProvider from "./contexts/AppContext";
import { ReactNode } from "react";
import { StoreProvider } from "./store/StoreProvider";
import MainBody from "./components/MainBody/MainBody";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <StoreProvider>
        <html lang="en">
          <BodyWapper>
            <MainBody />
            {children}
          </BodyWapper>
        </html>
      </StoreProvider>
    </AppContextProvider>
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
