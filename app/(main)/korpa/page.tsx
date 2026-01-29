"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/config";
import { TrashIcon, ShoppingCartIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function KorpaPage() {
  const { items, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen">
        <div className="bg-primary py-[70px] md:py-[61px]"></div>
        <div className="container  px-2 mx-auto max-w-4xl">
          <div className="bg-card rounded-xl p-12 text-center mt-8">
            <ShoppingCartIcon className="w-24 h-24 mx-auto mb-6 text-muted-foreground/20" />
            <h2 className="text-2xl font-bold mb-4">Korpa je prazna</h2>
            <p className="text-muted-foreground mb-8">
              Dodajte knjige u korpu da nastavite sa narudžbinom
            </p>
            <Link href="/knjige">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold"
              >
                Pogledajte knjige
              </motion.button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="bg-primary py-[70px] md:py-16"></div>
      <div className="container px-2 mx-auto max-w-6xl mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items
              .filter((item) => item.book)
              .map((item) => (
                <motion.div
                  key={item.book._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-card rounded-xl p-4 flex gap-4"
                >
                  <div className="relative w-24 h-32 flex-shrink-0">
                    {item.book.coverImage ? (
                      <Image
                        src={urlFor(item.book.coverImage)
                          .width(200)
                          .height(300)
                          .url()}
                        alt={item.book.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded-lg" />
                    )}
                  </div>

                  <div className="flex-1">
                    <Link href={`/knjige/${item.book.slug.current}`}>
                      <h3 className="font-bold text-lg mb-1 hover:text-primary transition-colors">
                        {item.book.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.book.author}
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {item.book.price.toLocaleString("sr-RS")} RSD
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.book._id)}
                      className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                    <div className="text-sm text-muted-foreground">
                      Količina: {item.quantity}
                    </div>
                  </div>
                </motion.div>
              ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearCart}
              className="text-destructive hover:underline font-semibold"
            >
              Isprazni korpu
            </motion.button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Rezime</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Broj artikala:</span>
                  <span className="font-semibold">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Ukupno:</span>
                    <span className="text-primary">
                      {getTotalPrice().toLocaleString("sr-RS")} RSD
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Nema troškova dostave - sve knjige su u elektronskom formatu
              </p>

              <Link href="/checkout">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary text-white px-6 py-4 rounded-lg font-semibold text-lg"
                >
                  Nastavite sa narudžbinom
                </motion.button>
              </Link>

              <Link href="/knjige">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-3 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold"
                >
                  Nastavite sa kupovinom
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
