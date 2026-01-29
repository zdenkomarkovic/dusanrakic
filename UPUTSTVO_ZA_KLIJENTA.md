# Uputstvo za Klijenta - Dušan Rakić E-knjige Sajt

## ŠTA JE URAĐENO

Napravljen je kompletan Next.js sajt za prodaju elektronskih knjiga sa sledećim funkcionalnostima:

### ✅ Stranice:
- **Početna stranica** (`/`) - Hero sekcija sa slikom, izdvojene knjige, info sekcija
- **Knjige** (`/knjige`) - Prikaz svih knjiga
- **Detalji knjige** (`/knjige/[slug]`) - Detaljni prikaz pojedinačne knjige sa mogućnošću kupovine
- **O nama** (`/o-nama`) - Informacije o vama i vašem radu
- **Kontakt** (`/kontakt`) - Kontakt forma i direktni kontakti

### ✅ Funkcionalnosti:
- Hero sekcija sa pozadinskom slikom iz `/public/images/IMG-20260123-WA0015.jpg`
- Prikaz knjiga iz Sanity CMS-a
- Mogućnost kupovine putem:
  - Email-a (ducalion@gmail.com)
  - WhatsApp-a (+381655025505)
- Preuzimanje besplatnog uzorka knjige (ako je dostupan)
- Responsive dizajn (radi na svim uređajima)
- Moderne animacije
- SEO optimizacija

### ✅ Kontakt informacije:
- **Ime**: Dušan Rakić - Raka Gegenpresing
- **Tagline**: Fudbal IQ Trenerska edukacija za modernu igru
- **Subtitle**: Teren & Tabla Trenerski centar
- **Email**: ducalion@gmail.com
- **Telefoni**: +381655025505, +38162553553

## SLEDEĆI KORACI - ŠTA VI TREBA DA URADITE

### 1. Podešavanje Sanity CMS (OBAVEZNO)

Sanity CMS je sistem za upravljanje sadržajem gde ćete dodavati i menjati knjige.

**DETALJNE INSTRUKCIJE SU U FAJLU: `SANITY_SETUP.md`**

Ukratko:
1. Registrujte se na [sanity.io](https://www.sanity.io/)
2. Kreirajte novi projekat
3. Instalirajte Sanity CLI: `npm install -g @sanity/cli`
4. Pratite korake iz `SANITY_SETUP.md` fajla

### 2. Dodajte vaše knjige

Nakon što podesite Sanity:
1. Otvorite Sanity Studio
2. Kliknite na "Knjiga"
3. Dodajte vašu prvu knjigu sa svim informacijama:
   - Naslov
   - Slika korica
   - Opis
   - Cena
   - Autor
   - Format (PDF, EPUB, MOBI)
   - Označite kao "Izdvojeno" da se prikaže na početnoj
4. Objavite knjigu

### 3. Testiranje lokalno

```bash
npm install      # Instalirajte sve pakete
npm run dev      # Pokrenite development server
```

Otvorite `http://localhost:3000` u browseru.

### 4. Deployment (Postavljanje sajta online)

**PREPORUČENO: Vercel**

1. Push kod na GitHub (ako već nije)
2. Idite na [vercel.com](https://vercel.com)
3. Registrujte se / prijavite se
4. Kliknite "New Project"
5. Import-ujte vaš GitHub repozitorijum
6. Dodajte Environment Variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` - vaš Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET` - `production`
7. Kliknite "Deploy"

**VAŽNO**: Nakon deployment-a, dodajte production URL u Sanity CORS settings!

### 5. Domen (opciono)

Možete povezati vaš domen (npr. dusanrakic.com) sa Vercel-om:
1. U Vercel projektu, idite na Settings → Domains
2. Dodajte vaš domen
3. Podesite DNS records kod registrara domena

## PROMENA SADRŽAJA

### Promena kontakt informacija

Otvorite fajl `/constants/index.ts`:

```typescript
export const siteInfo = {
  name: "Dušan Rakić - Raka Gegenpresing",
  title: "Fudbal IQ Trenerska edukacija za modernu igru",
  subtitle: "Teren & Tabla Trenerski centar",
  email: "ducalion@gmail.com",
  phones: ["+381655025505", "+38162553553"],
};
```

### Promena hero slike

Stavite novu sliku u `/public/images/` folder i ažurirajte putanju u `/components/BookHero.tsx`:

```typescript
<Image
  src="/images/nova-slika.jpg"  // Promenite ovo
  alt="Fudbal IQ - Trenerska edukacija"
  fill
  className="w-full h-[100dvh] object-cover"
  priority
/>
```

### Dodavanje/Brisanje knjiga

Sve se radi kroz Sanity CMS! Ne morate dirati kod.

## STRUKTURA FAJLOVA

```
├── app/                    # Stranice
│   ├── page.tsx           # Početna
│   ├── knjige/            # Knjige stranice
│   ├── o-nama/            # O nama
│   └── kontakt/           # Kontakt
├── components/            # Komponente
├── sanity/                # Sanity konfiguracija
├── constants/             # Kontakt info i navigacija
├── public/images/         # Slike
└── .env.local            # Environment variables (NE COMMIT-OVATI!)
```

## VAŽNE NAPOMENE

1. **`.env.local` fajl NE SME biti na GitHub-u** - već je u `.gitignore`
2. **Sanity Project ID** je potreban da sajt radi
3. **CORS podešavanja** u Sanity-ju moraju biti podešena
4. **Prvo testirajte lokalno** pre deployment-a

## POMOĆ I PITANJA

Ako imate problema:

1. Proverite `SANITY_SETUP.md` za Sanity podešavanje
2. Proverite `README_PROJEKAT.md` za tehničke detalje
3. Kontaktirajte developera koji je napravio sajt

## ČESTA PITANJA

**Q: Knjige se ne prikazuju na sajtu?**
A: Proverite da li ste:
- Podesili Sanity Project ID u `.env.local`
- Dodali knjige u Sanity-ju i publish-ovali ih
- Označili knjige kao "Izdvojeno" da se prikažu na početnoj

**Q: Ne vidim slike knjiga?**
A: Proverite CORS podešavanja u Sanity-ju - mora biti dodat vaš localhost i production URL

**Q: Kako da promenim cene knjiga?**
A: Otvorite Sanity Studio, pronađite knjigu, promenite cenu, publish

**Q: Kako da dodam novu kategoriju knjiga?**
A: Ažurirajte `/sanity/schemas/book.ts` fajl i dodajte novu kategoriju u listu

## BACKUP

Pre bilo kakvih promena, uvek napravite backup:
```bash
git add .
git commit -m "Backup pre promene"
git push
```

---

**Srećno sa prodajom knjiga! ⚽📚**
