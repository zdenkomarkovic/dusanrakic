"use client";

import { Book } from "@/types/book";
import BookCard from "./BookCard";

interface FeaturedBooksProps {
  books: Book[];
}

export default function FeaturedBooks({ books }: FeaturedBooksProps) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Izdvojene knjige
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Stručne knjige za trenere i ljubitelje fudbala
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <BookCard key={book._id} book={book} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
