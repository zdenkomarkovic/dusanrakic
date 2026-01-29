import BookHero from "@/components/BookHero";
import FeaturedBooks from "@/components/FeaturedBooks";
import FeaturedSeminars from "@/components/FeaturedSeminars";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import { client } from "@/sanity/config";
import { Book } from "@/types/book";
import { Seminar } from "@/types/seminar";
import { Library, Zap, Target } from "lucide-react";

async function getFeaturedBooks(): Promise<Book[]> {
  try {
    const query = `*[_type == "book" && featured == true] | order(_createdAt desc) [0...3]`;
    const books = await client.fetch(query);
    return books;
  } catch (error) {
    console.error("Error fetching featured books:", error);
    return [];
  }
}

async function getFeaturedSeminars(): Promise<Seminar[]> {
  try {
    const query = `*[_type == "seminar" && (featured == true || status == "active")] | order(date asc) [0...3]`;
    const seminars = await client.fetch(query);
    return seminars;
  } catch (error) {
    console.error("Error fetching featured seminars:", error);
    return [];
  }
}

export default async function Home() {
  const featuredBooks = await getFeaturedBooks();
  const featuredSeminars = await getFeaturedSeminars();

  return (
    <main>
      <BookHero />
      <FeaturedBooks books={featuredBooks} />

      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stručna literatura za trenere
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Kroz naše knjige, delimo praktična znanja i iskustva koja će vam
            pomoći da unapredite svoje trenerske veštine. Sve knjige su dostupne
            u elektronskom formatu, sa trenutnim preuzimanjem nakon kupovine.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Library className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Stručan sadržaj</h3>
              <p className="text-muted-foreground">
                Knjige zasnovane na praksi i savremenim metodama treninga
              </p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Instant download</h3>
              <p className="text-muted-foreground">
                Odmah nakon kupovine preuzmite vašu e-knjigu
              </p>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Target className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Praktična primena</h3>
              <p className="text-muted-foreground">
                Primenljiva znanja za treninge i utakmice
              </p>
            </div>
          </div>
        </div>
      </section>
      <FeaturedSeminars seminars={featuredSeminars} />
      <Statistics />
      <Testimonials />
    </main>
  );
}
