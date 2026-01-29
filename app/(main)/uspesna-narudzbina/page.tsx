import Link from "next/link";
import { CheckCircleIcon } from "lucide-react";

export const metadata = {
  title: "Uspešna narudžbina | Dušan Rakić - Raka Gegenpresing",
  description: "Vaša narudžbina je uspešno poslata",
};

export default function UspesnaNarudzbinaPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-card rounded-xl p-12 text-center">
          <div className="mb-8">
            <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Uspešno ste naručili!
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Javiće mo vam se u najkraćem roku
          </p>

          <div className="bg-muted/30 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-bold text-xl mb-4">Šta se dešava dalje?</h2>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary flex-shrink-0">1.</span>
                <span>
                  Poslali smo vam potvrdu narudžbine na vaš email. Proverite
                  inbox (i spam folder).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary flex-shrink-0">2.</span>
                <span>
                  Kontaktiraćemo vas uskoro putem telefona ili email-a radi
                  dogovora oko plaćanja.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary flex-shrink-0">3.</span>
                <span>
                  Nakon potvrđene uplate, knjige u elektronskom formatu stižu
                  direktno na vaš email.
                </span>
              </li>
            </ol>
          </div>

          <div className="bg-primary/10 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-3">Kontakt informacije</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ako imate pitanja, slobodno nas kontaktirajte:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:ducalion@gmail.com"
                  className="text-primary hover:underline"
                >
                  ducalion@gmail.com
                </a>
              </p>
              <p>
                <strong>Telefon:</strong>{" "}
                <a
                  href="tel:+381655025505"
                  className="text-primary hover:underline"
                >
                  +381 65 502 5505
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/knjige">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Pogledajte još knjiga
              </button>
            </Link>
            <Link href="/">
              <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                Nazad na početnu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
