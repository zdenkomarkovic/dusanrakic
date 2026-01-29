"use client";

import { client, urlFor } from "@/sanity/config";
import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  DownloadIcon,
  ShoppingCartIcon,
  ClipboardList,
  Mail,
  Plus,
  Minus,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { notFound, useParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BookStats from "@/components/BookStats";
import PortableTextImage from "@/components/PortableTextImage";

const portableTextComponents = {
  types: {
    image: PortableTextImage,
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-justify">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 clear-both">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold mt-6 mb-3 clear-both">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-semibold mt-4 mb-2 clear-both">{children}</h4>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({ children, value }: { children?: React.ReactNode; value: { href: string } }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
    ),
  },
};

export default function BookDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchBook() {
      try {
        const query = `*[_type == "book" && slug.current == $slug][0]{
          ...,
          "sampleFile": sampleFile.asset->url
        }`;
        const fetchedBook = await client.fetch(query, { slug });
        setBook(fetchedBook);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [slug]);

  const handleAddToCart = () => {
    if (book) {
      for (let i = 0; i < quantity; i++) {
        addToCart(book);
      }
      toast.success(`${quantity} x "${book.title}" je dodato u korpu!`);
      setQuantity(1);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl text-center py-20">
          <p className="text-xl text-muted-foreground">Učitavanje...</p>
        </div>
      </main>
    );
  }

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="bg-primary py-[70px] md:py-[61px]"></div>
      <div className="container px-2 py-5 mx-auto max-w-7xl">
        <Link
          href="/knjige"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Nazad na sve knjige
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="relative">
            <div className="sticky top-28">
              <div className="relative aspect-[11/16] w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl">
                {book.coverImage ? (
                  <Image
                    src={urlFor(book.coverImage).url()}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <BookOpenIcon className="w-32 h-32 text-foreground/20" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl mt-8 md:text-4xl font-bold mb-4 md:mb-6">
              {book.title}
            </h1>

            <div className="mb-6 space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Autor:</span> {book.author}
              </p>
              <p className="text-foreground mb-6 leading-relaxed">
                {book.description}
              </p>
            </div>

            <BookStats
              pages={book.pages}
              exercisesCount={book.exercisesCount}
              ageRangeFrom={book.ageRangeFrom}
              ageRangeTo={book.ageRangeTo}
              size="large"
            />
            <div className="grid md:grid-cols-2 gap-4 items-center mb-4">
              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-sm text-foreground mb-1">Cena</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="md:text-lg font-bold">
                      {book.price.toLocaleString("sr-RS")} RSD
                    </p>
                  </div>
                  <div className="flex items-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={decrementQuantity}
                      className="bg-white hover:bg-primary hover:text-white text-primary rounded-lg p-2 shadow-md transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    <span className="text-xl md:text-2xl font-bold min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={incrementQuantity}
                      className="bg-white hover:bg-primary hover:text-white text-primary rounded-lg p-2 shadow-md transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <div className="pt-1 border-t border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className=" font-semibold">Ukupno:</span>
                    <span className="text-lg font-bold">
                      {(book.price * quantity).toLocaleString("sr-RS")} RSD
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg w-full shadow-lg"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  Dodaj u korpu
                </motion.button>
                <Link href="/korpa">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary transition-colors duration-500 w-full"
                  >
                    Pogledaj korpu
                  </motion.button>
                </Link>
              </div>
            </div>
            {book.sampleFile && (
              <a
                href={book.sampleFile}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-500 w-full mb-8"
              >
                <DownloadIcon className="w-5 h-5" />
                Preuzmi besplatan uzorak
              </a>
            )}

            <div className="max-w-none">
              {book.tableOfContents && book.tableOfContents.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Sadržaj knjige</h3>
                  <ul className="space-y-2">
                    {book.tableOfContents.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-foreground font-semibold">
                          {index + 1}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-20 bg-primary/5 rounded-xl p-2 md:p-8">
          <h2 className="text-2xl text-foreground font-bold mb-6 text-center">
            O knjizi
          </h2>
          {book.longDescription && book.longDescription.length > 0 && (
            <div className="text-foreground text-left overflow-auto">
              <PortableText
                value={book.longDescription}
                components={portableTextComponents}
              />
              <div className="clear-both"></div>
            </div>
          )}
        </div>
        <div className="mt-20 bg-primary/5 rounded-xl p-8 text-center">
          <h2 className=" text-primary font-bold mb-4">
            Kako funkcioniše kupovina?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-card p-3 md:p-6 rounded-lg">
              <div className="flex justify-center mb-2 md:mb-4">
                <div className="bg-primary p-3 md:p-4 rounded-full">
                  <ShoppingCartIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
              </div>
              <h3 className="text-primary font-bold md:mb-2">
                1. Dodajte u korpu
              </h3>
            </div>
            <div className="bg-card p-3 md:p-6 rounded-lg">
              <div className="flex justify-center mb-2 md:mb-4">
                <div className="bg-primary p-3 md:p-4 rounded-full">
                  <ClipboardList className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
              </div>
              <h3 className="text-primary font-bold md:mb-2">
                2. Popunite podatke
              </h3>
            </div>
            <div className="bg-card p-3 md:p-6 rounded-lg">
              <div className="flex justify-center mb-2 md:mb-4">
                <div className="bg-primary p-3 md:p-4 rounded-full">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
              </div>
              <h3 className="text-primary font-bold md:mb-2">
                3. Kontaktiraćemo vas
              </h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
