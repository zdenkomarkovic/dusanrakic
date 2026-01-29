import ButtonToTop from "@/components/ButtonToTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart-context";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="text-foreground bg-muted text-base md:text-xl">
        {/* <TopComponent /> */}
        <Header />
        {children}
        <ButtonToTop />
        <Footer />
        <Toaster />
      </div>
    </CartProvider>
  );
}
