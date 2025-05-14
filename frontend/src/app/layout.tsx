import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/providers/ClientProvider";
import MainLayout from "@/components/layout/MainLayout";
// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ClientProvider>
      </body>
    </html>
  );
}
