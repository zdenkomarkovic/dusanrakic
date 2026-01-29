"use client";

import { useCart } from "@/lib/cart-context";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartIcon({ scrolled = true }: { scrolled?: boolean }) {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Link href="/korpa">
      <motion.div
        animate={{ color: scrolled ? "hsl(var(--foreground))" : "#ffffff" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <ShoppingCartIcon className="w-6 h-6" />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute -top-2 -right-2 ${scrolled ? "bg-foreground text-white" : "bg-white text-primary"}   text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}
          >
            {itemCount}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
}
