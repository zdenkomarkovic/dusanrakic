import { client } from "@/sanity/config";
import { Book } from "@/types/book";
import BookCard from "@/components/BookCard";

async function getAllBooks(): Promise<Book[]> {
  try {
    const query = `*[_type == "book"] | order(_createdAt desc)`;
    const books = await client.fetch(query);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

export const metadata = {
  title: "Knjige | Dušan Rakić - Raka Gegenpresing",
  description: "Stručna literatura o fudbalu i trenerskoj edukaciji",
};

export default async function KnjigePage() {
  const books = await getAllBooks();

  return (
    <main className="min-h-screen">
      <div className="bg-primary py-[70px] md:py-[61px]"></div>
      <div className="container px-2 mx-auto max-w-7xl">
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Naše knjige</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stručna literatura za trenere i ljubitelje fudbala
          </p>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Trenutno nema dostupnih knjiga. Uskoro očekujte novo izdanje!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <BookCard key={book._id} book={book} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
