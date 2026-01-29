# Dušan Rakić - Raka Gegenpresing - E-knjige

Sajt za prodaju elektronskih knjiga o fudbalu i trenerskoj edukaciji.

## 🚀 Tehnologije

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Sanity CMS** - Content management
- **Framer Motion** - Animacije

## 📦 Instalacija

1. Klonirajte repozitorijum
2. Instalirajte zavisnosti:

```bash
npm install
```

3. Podesite environment variables:

Kreirajte `.env.local` fajl u root folderu:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=vaš_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Podesite Sanity CMS (vidite `SANITY_SETUP.md` za detaljne instrukcije)

## 🏃 Pokretanje

### Development mode:

```bash
npm run dev
```

Sajt će biti dostupan na `http://localhost:3000`

### Production build:

```bash
npm run build
npm start
```

## 📁 Struktura projekta

```
├── app/                      # Next.js app directory
│   ├── page.tsx             # Početna stranica
│   ├── knjige/              # Stranice za knjige
│   │   ├── page.tsx         # Lista svih knjiga
│   │   └── [slug]/          # Detalji pojedinačne knjige
│   ├── o-nama/              # O nama stranica
│   ├── kontakt/             # Kontakt stranica
│   └── layout.tsx           # Root layout
├── components/              # React komponente
│   ├── BookHero.tsx         # Hero sekcija
│   ├── BookCard.tsx         # Kartica knjige
│   ├── FeaturedBooks.tsx    # Izdvojene knjige
│   ├── Header.tsx           # Header navigacija
│   └── Footer.tsx           # Footer
├── sanity/                  # Sanity konfiguracija
│   ├── config.ts            # Sanity client
│   └── schemas/             # Sanity schemas
│       └── book.ts          # Schema za knjige
├── types/                   # TypeScript tipovi
│   └── book.ts              # Book tip
├── constants/               # Konstante
│   └── index.ts             # Site info i navigacija
└── public/                  # Statički fajlovi
    └── images/              # Slike
```

## 🎨 Funkcionalnosti

- ✅ Hero sekcija sa pozadinskom slikom
- ✅ Prikaz izdvojenih knjiga na početnoj strani
- ✅ Stranica sa svim knjigama
- ✅ Detaljni prikaz pojedinačne knjige
- ✅ Mogućnost porudžbine putem email-a ili WhatsApp-a
- ✅ Preuzimanje besplatnog uzorka (ako je dostupan)
- ✅ Responsive dizajn
- ✅ Animacije (Framer Motion)
- ✅ SEO optimizacija
- ✅ Kontakt forma
- ✅ O nama stranica

## 📝 Dodavanje knjiga

Sve knjige se dodaju kroz Sanity CMS. Vidite `SANITY_SETUP.md` za detaljne instrukcije.

### Polja za knjigu:

- **Naslov** (obavezno) - Naslov knjige
- **Slug** (obavezno) - URL-friendly verzija naslova
- **Podnaslov** - Dodatni naslov
- **Slika korica** (obavezno) - Slika korica knjige
- **Opis** (obavezno) - Kratak opis (prikazuje se na kartici)
- **Detaljni opis** - Duži opis sa formatiranjem
- **Cena** (obavezno) - Cena u RSD
- **Autor** (obavezno) - Ime autora
- **Broj strana** - Broj strana knjige
- **Jezik** - Jezik knjige (Srpski/Engleski)
- **Format** - Dostupni formati (PDF, EPUB, MOBI)
- **Izdvojeno** - Da li prikazati na početnoj strani
- **Kategorija** - Kategorija knjige
- **Besplatan uzorak** - PDF fajl sa uzorkom
- **Sadržaj knjige** - Lista poglavlja/sekcija

## 🎯 Kontakt informacije

Kontakt informacije se menjaju u `/constants/index.ts`:

```typescript
export const siteInfo = {
  name: "Dušan Rakić - Raka Gegenpresing",
  title: "Fudbal IQ Trenerska edukacija za modernu igru",
  subtitle: "Teren & Tabla Trenerski centar",
  email: "ducalion@gmail.com",
  phones: ["+381655025505", "+38162553553"],
};
```

## 🖼️ Slike

Hero slika se nalazi u `/public/images/IMG-20260123-WA0015.jpg`

Da promenite hero sliku, zamenite fajl ili ažurirajte putanju u `/components/BookHero.tsx`:

```typescript
<Image
  src="/images/vasa-nova-slika.jpg"
  alt="Fudbal IQ - Trenerska edukacija"
  fill
  className="w-full h-[100dvh] object-cover"
  priority
/>
```

## 🚀 Deployment

Sajt možete deployovati na Vercel, Netlify ili bilo koji drugi Next.js hosting.

### Vercel (preporučeno):

1. Push kod na GitHub
2. Idite na [vercel.com](https://vercel.com)
3. Import repozitorijum
4. Dodajte environment variables
5. Deploy!

Ne zaboravite da dodate production URL u Sanity CORS settings.

## 📞 Podrška

Za pomoć ili pitanja, kontaktirajte:
- Email: ducalion@gmail.com
- Telefon: +381 65 502 5505

## 📄 Licenca

Sva prava zadržana © 2026 Dušan Rakić - Raka Gegenpresing
