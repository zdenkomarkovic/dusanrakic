import Image from "next/image";
import { Target, Library, Zap } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="bg-[#4B4840] grid grid-cols-1 md:grid-cols-2 min-h-[60vh] md:min-h-[70vh]">
      <div className="flex flex-col justify-center items-center gap-6 p-8 md:p-12">
        <div className="bg-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow md:w-1/2">
          <div className="flex gap-4 items-center mb-3">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Profesionalno iskustvo</h3>
          </div>
          <p className="text-muted-foreground">
            Rad sa vrhunskim igračima FK Crvena zvezda i iskustvo sa evropskih
            terena
          </p>
        </div>

        <div className="bg-card md:w-1/2 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex gap-4 items-center mb-3">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
              <Library className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Naučni pristup</h3>
          </div>
          <p className="text-muted-foreground">
            Metode zasnovane na najnovijim istraživanjima i praktičnoj primeni u
            vrhunskom fudbalu
          </p>
        </div>

        <div className="bg-card md:w-1/2 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex gap-4 items-center mb-3">
            <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Individualan pristup</h3>
          </div>
          <p className="text-muted-foreground">
            Prilagođeni programi za svakog igrača prema njihovim specifičnim
            potrebama i ciljevima
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden min-h-[400px] md:min-h-0">
        <Image
          src="/images/IMG-20260123-WA0028.jpg"
          alt="Dušan Rakić - Trening"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
