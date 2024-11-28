"use client";
import { Inter } from 'next/font/google'
import './globals.css'; // Import global styles
import { AbstraxionProvider } from "@burnt-labs/abstraxion"; // Import AbstraxionProvider component

import "@burnt-labs/abstraxion/dist/index.css"; // Import Abstraxion library styles
import "@burnt-labs/ui/dist/index.css"; // Import UI components library styles


const inter = Inter({ subsets: ['latin'] })

// export const seatContractAddress =
//   "xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AbstraxionProvider
          config={{
            contracts: ["xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka"],
          }}
        >
          {children}
        </AbstraxionProvider>
      </body>
    </html>
  )
}


// The RootLayout component accepts children as its content and wraps them with the AbstraxionProvider to provide context for managing accounts and signing transactions.

// The html tag has lang="en", setting the page language to English.
// The body tag uses className={inter.className} to apply the Inter font style.
// The AbstraxionProvider is configured with a contract address to enable the dApp to interact with the XION blockchain.