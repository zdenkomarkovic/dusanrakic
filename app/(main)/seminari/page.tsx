import { client } from "@/sanity/config";
import { Seminar } from "@/types/seminar";
import SeminarCard from "@/components/SeminarCard";

async function getAllSeminars(): Promise<Seminar[]> {
  try {
    const query = `*[_type == "seminar"] | order(date asc)`;
    const seminars = await client.fetch(query);
    return seminars;
  } catch (error) {
    console.error("Error fetching seminars:", error);
    return [];
  }
}

export const metadata = {
  title: "Seminari | Dušan Rakić - Raka Gegenpresing",
  description: "Praktična edukacija i seminari za trenere fudbala",
};

export default async function SeminariPage() {
  const seminars = await getAllSeminars();

  const activeSeminars = seminars.filter(s => s.status === 'active' || s.status === 'full');
  const pastSeminars = seminars.filter(s => s.status === 'finished');

  return (
    <main className="min-h-screen">
      <div className="bg-primary px-4 py-16"></div>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Seminari i edukacije</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Praktična znanja direktno sa terena - pridružite se našim seminarima
          </p>
        </div>

        {activeSeminars.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Nadolazeći seminari</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeSeminars.map((seminar, index) => (
                <SeminarCard key={seminar._id} seminar={seminar} index={index} />
              ))}
            </div>
          </div>
        )}

        {activeSeminars.length === 0 && (
          <div className="text-center py-20 bg-card rounded-xl mb-16">
            <h2 className="text-2xl font-bold mb-4">Trenutno nema aktivnih seminara</h2>
            <p className="text-muted-foreground">
              Pratite nas za najnovije informacije o predstojećim edukacijama
            </p>
          </div>
        )}

        {pastSeminars.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Prošli seminari</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastSeminars.map((seminar, index) => (
                <SeminarCard key={seminar._id} seminar={seminar} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
