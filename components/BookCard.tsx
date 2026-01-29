"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book } from "@/types/book";
import { urlFor } from "@/sanity/config";
import { BookOpenIcon, ShoppingCartIcon, PlusIcon } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

interface BookCardProps {
  book: Book;
  index: number;
}

export default function BookCard({ book, index }: BookCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
    toast.success(`"${book.title}" je dodato u korpu!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link href={`/knjige/${book.slug.current}`}>
        <div className="bg-card p-2.5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col relative cursor-pointer">
          {/* Ikonica korpe sa plus u gornjem desnom uglu */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="absolute top-4 right-4 z-10 bg-foreground text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <ShoppingCartIcon className="w-6 h-6" />
              <PlusIcon className="w-4 h-4 absolute -top-1 -right-1 bg-white text-foreground rounded-full" />
            </div>
          </motion.button>

          <div className="relative rounded-md aspect-[11/16] w-full overflow-hidden bg-muted">
            {book.coverImage ? (
              <Image
                src={urlFor(book.coverImage).url()}
                alt={book.title}
                fill
                className="object-cover aspect-[9/16] group-hover:scale-105  transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <BookOpenIcon className="w-20 h-20 text-muted-foreground/20" />
              </div>
            )}
          </div>
          <div className="pt-2 flex-1 flex flex-col justify-between">
            <h3 className="text-base font-bold mb-2 line-clamp-2 text-foreground text-left">
              {book.title}
            </h3>
            <p className="text-base font-semibold text-right mt-2">
              {book.price.toLocaleString("sr-RS")} RSD
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
