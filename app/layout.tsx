import Navbar from "@/components/common/Navbar";
import "./globals.css";

import { ThemeProvider } from "@/components/common/theme-provider";
import Footer from "@/components/common/Footer";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster richColors position="top-right" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
