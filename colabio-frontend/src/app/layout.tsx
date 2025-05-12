import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletConnection } from "@/components/WalletConnection"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})



export const metadata: Metadata = {
  title: "Colabio - Crowdfunding on Solana",
  description: "A crowdfunding platform built on Solana blockchain",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <WalletConnection>
            <Navigation />
            <main className="bg-[#F8F9FA] min-h-screen pt-16">{children}</main>
            <Footer />
          </WalletConnection>
        </ThemeProvider>
      </body>
    </html>
  )
}
