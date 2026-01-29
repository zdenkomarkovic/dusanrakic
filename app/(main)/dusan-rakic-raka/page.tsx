import { siteInfo } from "@/constants";
import Image from "next/image";

import {
  MailIcon,
  PhoneIcon,
  BookOpenIcon,
  AwardIcon,
  UsersIcon,
  GraduationCapIcon,
  TrophyIcon,
  HeartIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
} from "lucide-react";

export const metadata = {
  title: "Dušan Rakić - Raka | UEFA licencirani trener i edukator",
  description:
    "Upoznajte Dušana Rakića - Raka, UEFA licenciranog kondicijskog trenera FK Crvena zvezda i autora stručne literature o modernom fudbalu",
};

export default function DusanRakicPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-primary py-[70px] md:py-[61px]"></div>
      <div className="container mx-auto px-2 max-w-6xl text-foreground">
        {/* Hero sekcija */}
        <div className="text-center mb-10 md:mb-20">
          <h1 className="text-3xl mt-8 md:text-6xl font-bold mb-6">
            Dušan Rakić - Raka
          </h1>
          <p className="text-lg md:text-2xl text-foreground max-w-3xl mx-auto">
            UEFA licencirani kondicijski trener FK Crvena zvezda, autor i
            edukator u oblasti modernog fudbala
          </p>
        </div>

        {/* O treneru - Biografija */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">O treneru</h2>
              <div className="space-y-4 text-lg text-foreground">
                <p>
                  Dušan Rakić, poznatiji kao{" "}
                  <strong className="text-foreground">Raka</strong>, je UEFA
                  licencirani kondicijski trener sa bogatim iskustvom u radu sa
                  vrhunskim sportistima. Trenutno obavlja funkciju kondicijskog
                  trenera u FK Crvena zvezda, najuspešnijem fudbalskom klubu u
                  Srbiji.
                </p>
                <p>
                  Kroz svoju karijeru, Raka je razvio sveobuhvatan pristup
                  kondicijskoj pripremi, koristeći najnovija naučna saznanja i
                  moderne trenerske metode. Njegovo iskustvo obuhvata rad sa
                  igračima svih uzrasta, od omladinskih selekcija do
                  profesionalnih timova.
                </p>
                <p>
                  Predan je kontinuiranom usavršavanju i praćenju globalnih
                  trendova u oblasti sportske nauke, što mu omogućava da svom
                  timu pruži najbolje moguće rezultate.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG-20260123-WA0014.jpg"
                alt="Dušan Rakić - Raka"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Kvalifikacije i licence */}
        <div className="mb-32">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Kvalifikacije i licence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-card p-6 rounded-xl shadow-lg border-2 border-primary">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShieldCheckIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">UEFA Licenca</h3>
                </div>
                <p className="text-muted-foreground">
                  Sertifikovani UEFA trener sa završenim stručnim edukacijama
                  koje ga kvalifikuju za rad na profesionalnom nivou
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCapIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Sportska nauka</h3>
                </div>
                <p className="text-muted-foreground">
                  Kontinuirano obrazovanje u oblasti sportske nauke, kondicijske
                  pripreme i metodike treninga
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <BriefcaseIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Profesionalno iskustvo</h3>
                </div>
                <p className="text-muted-foreground">
                  Višegodišnje iskustvo rada sa profesionalnim timovima i
                  vrhunskim sportistima
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <HeartIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Prevencija povreda</h3>
                </div>
                <p className="text-muted-foreground">
                  Specijalizovana znanja iz oblasti prevencije sportskih povreda
                  i funkcionalnog treninga
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrophyIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Vrhunski fudbal</h3>
                </div>
                <p className="text-muted-foreground">
                  Rad u profesionalnom okruženju FK Crvena zvezda sa igračima
                  koji nastupaju na najvišem nivou
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpenIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Autor publikacija</h3>
                </div>
                <p className="text-muted-foreground">
                  Autor stručnih knjiga i edukativnih materijala koji se koriste
                  u trenerskoj edukaciji
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trenerska filozofija */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG-20260123-WA0016.jpg"
                alt="Trenerska filozofija"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Trenerska filozofija
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Rakina trenerska filozofija zasniva se na{" "}
                  <strong className="text-foreground">
                    holističkom pristupu
                  </strong>
                  razvoju igrača. On veruje da kondicijska priprema mora biti
                  potpuno integrisana sa taktičkim i tehničkim aspektima igre.
                </p>
                <p>
                  Poseban naglasak stavlja na{" "}
                  <strong className="text-foreground">
                    prevenciju povreda
                  </strong>
                  , funkcionalnu snagu i razvoj eksplozivnosti koja je neophodna
                  za moderan fudbal visokog intenziteta.
                </p>
                <p>
                  Individualizacija treninga je ključna komponenta njegovog rada
                  - prepoznaje da svaki igrač ima jedinstvene potrebe i
                  prilagođava programe da bi maksimizovao potencijal svakog
                  člana tima.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Karakteristike rada */}
        <div className="mb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Ključne karakteristike
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrophyIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Vrhunsko iskustvo</h3>
              <p className="text-muted-foreground">
                Rad sa profesionalnim igračima i timovima na najvišem nivou
                konkurencije.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BookOpenIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Naučni pristup</h3>
              <p className="text-muted-foreground">
                Korišćenje najnovijih istraživanja i tehnologija u kondicijskoj
                pripremi.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <HeartIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Prevencija povreda</h3>
              <p className="text-muted-foreground">
                Fokus na zdravlje igrača i minimiziranje rizika od povreda kroz
                adekvatan trening.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <UsersIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Individualizacija</h3>
              <p className="text-muted-foreground">
                Prilagođeni programi za svakog igrača prema njihovim specifičnim
                potrebama.
              </p>
            </div>
          </div>
        </div>

        {/* Autor i edukator */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Autor i edukator
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Pored aktivnog trenerskog rada, Dušan Rakić je i{" "}
                  <strong className="text-foreground">predan edukator</strong>
                  koji svoje znanje i iskustvo deli sa širom trenerskom
                  zajednicom kroz stručnu literaturu.
                </p>
                <p>
                  Njegove knjige predstavljaju{" "}
                  <strong className="text-foreground">
                    most između teorije i prakse
                  </strong>
                  , donoseći kompleksne koncepte modernog fudbala na pristupačan
                  i primenljiv način. Svaka publikacija je rezultat godina
                  istraživanja, rada na terenu i kontinuiranog učenja.
                </p>
                <p>
                  Kroz svoje edukativne materijale, Raka ima za cilj da pomogne
                  trenerima na svim nivoima da unaprede svoje znanje i veštine,
                  kako bi mogli efikasnije da razvijaju svoje igrače i timove.
                </p>
                <p>
                  <strong className="text-foreground">Njegova misija</strong> je
                  da doprinese razvoju srpskog i regionalnog fudbala kroz
                  edukaciju i deljenje stručnog znanja koje može direktno da se
                  primeni u svakodnevnom trenerskom radu.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG-20260123-WA0015.jpg"
                alt="Autor i edukator"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Rad sa Crvenom zvezdom */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG-20260123-WA0022.jpg"
                alt="FK Crvena zvezda"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                FK Crvena zvezda
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Kao kondicijski trener{" "}
                  <strong className="text-foreground">FK Crvena zvezda</strong>,
                  jednog od najuspešnijih klubova u regionu, Raka ima
                  privilegiju da radi sa vrhunskim igračima i da doprinosi
                  uspehu tima na domaćoj i međunarodnoj sceni.
                </p>
                <p>
                  Njegov rad obuhvata pripremu igrača za najzahtevnije utakmice,
                  uključujući evropska takmičenja gde se stiču iskustva koja su
                  neprocenjiva za profesionalni razvoj trenera i edukatora.
                </p>
                <p>
                  Iskustvo stečeno kroz rad u ovakvom profesionalnom okruženju
                  direktno se reflektuje u kvalitetu i praktičnoj primenljivosti
                  njegovih edukativnih materijala.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edukativne vrednosti */}
        <div className="bg-muted/30 rounded-xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Edukativne vrednosti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <GraduationCapIcon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Praktično znanje</h3>
                <p className="text-muted-foreground">
                  Svaki koncept je objašnjen kroz praktične primere i konkretne
                  primene u treningu.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <AwardIcon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Proveren pristup</h3>
                <p className="text-muted-foreground">
                  Sve metode i tehnike su testirane i proverene u radu sa
                  profesionalnim igračima.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Dostupan sadržaj</h3>
                <p className="text-muted-foreground">
                  Kompleksne teme predstavljene na pristupačan način koji je
                  razumljiv trenerima svih nivoa.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Zajednica trenera</h3>
                <p className="text-muted-foreground">
                  Doprinos razvoju trenerske zajednice kroz deljenje znanja i
                  iskustva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 max-w-6xl">
        {/* Kontakt sekcija */}
        <div className="bg-card rounded-xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Kontaktirajte nas
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Imate pitanja o knjigama, želite da saznate više o trenerskim
            metodama ili vam je potrebna dodatna edukacija? Slobodno nas
            kontaktirajte!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href={`mailto:${siteInfo.email}`}
              className="flex flex-col items-center gap-2 p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <MailIcon className="w-8 h-8 text-primary" />
              <span className="font-semibold">Email</span>
              <span className="text-sm text-muted-foreground break-all">
                {siteInfo.email}
              </span>
            </a>

            {siteInfo.phones.map((phone, index) => (
              <a
                key={index}
                href={`tel:${phone}`}
                className="flex flex-col items-center gap-2 p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <PhoneIcon className="w-8 h-8 text-primary" />
                <span className="font-semibold">Telefon {index + 1}</span>
                <span className="text-sm text-muted-foreground">{phone}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
