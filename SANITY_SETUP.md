# Sanity CMS Podešavanje

Ovaj sajt koristi Sanity CMS za upravljanje knjigama. Pratite ove korake da podešite Sanity za vaš projekat.

## Korak 1: Kreirajte Sanity projekat

1. Idite na [https://www.sanity.io/](https://www.sanity.io/)
2. Registrujte se ili se prijavite
3. Kliknite na "Create new project"
4. Dajte projektu ime (npr. "Dusan Rakic Books")
5. Izaberite dataset name (preporučeno: "production")

## Korak 2: Instalirajte Sanity CLI

```bash
npm install -g @sanity/cli
```

## Korak 3: Kreirajte Sanity Studio folder

U root folderu vašeg projekta:

```bash
mkdir studio
cd studio
sanity init
```

Kada vas pita:
- **Select project to use**: Izaberite projekat koji ste kreirali u koraku 1
- **Select dataset to use**: production (ili ime koje ste dali)
- **Project output path**: Ostavite default (samo pritisnite Enter)
- **Select project template**: Clean project with no predefined schemas

## Korak 4: Kopirajte schema za knjige

U `studio/schemas` folderu, kreirajte fajl `book.ts` sa sledećim sadržajem (već postoji u glavnom projektu u `/sanity/schemas/book.ts`):

```typescript
export default {
  name: 'book',
  title: 'Knjiga',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Slika korica',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'longDescription',
      title: 'Detaljni opis',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'price',
      title: 'Cena (RSD)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pages',
      title: 'Broj strana',
      type: 'number',
    },
    {
      name: 'language',
      title: 'Jezik',
      type: 'string',
      options: {
        list: [
          { title: 'Srpski', value: 'sr' },
          { title: 'Engleski', value: 'en' },
        ],
      },
    },
    {
      name: 'format',
      title: 'Format',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'PDF', value: 'pdf' },
          { title: 'EPUB', value: 'epub' },
          { title: 'MOBI', value: 'mobi' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Izdvojeno',
      type: 'boolean',
      description: 'Prikaži na početnoj strani',
    },
    {
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      options: {
        list: [
          { title: 'Fudbal', value: 'fudbal' },
          { title: 'Trenerska edukacija', value: 'trenerska-edukacija' },
          { title: 'Taktika', value: 'taktika' },
          { title: 'Metodika', value: 'metodika' },
        ],
      },
    },
    {
      name: 'sampleFile',
      title: 'Besplatan uzorak (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'tableOfContents',
      title: 'Sadržaj knjige',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
```

## Korak 5: Registrujte schema

U `studio/schemas/index.ts`:

```typescript
import book from './book'

export const schemaTypes = [book]
```

## Korak 6: Dodajte environment variables

U root folderu projekta, otvorite `.env.local` fajl i dodajte:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=vaš_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

**Gde pronaći Project ID:**
- Idite na [sanity.io/manage](https://www.sanity.io/manage)
- Kliknite na vaš projekat
- Project ID je prikazan na vrhu stranice

## Korak 7: Pokrenite Sanity Studio

```bash
cd studio
sanity start
```

Sanity Studio će biti dostupan na `http://localhost:3333`

## Korak 8: Deploy Sanity Studio (opciono)

Da bi drugi ljudi mogli da pristupe Sanity Studio bez lokalnog pokretanja:

```bash
cd studio
sanity deploy
```

Izaberite hostname (npr. `dusan-rakic-books`) i vaš Studio će biti dostupan na `https://dusan-rakic-books.sanity.studio`

## Korak 9: Dodajte knjige

1. Otvorite Sanity Studio (lokalno ili deployed verziju)
2. Kliknite na "Knjiga" u meniju
3. Kliknite "Create new"
4. Popunite sva polja:
   - **Naslov**: Naslov knjige
   - **Slug**: Kliknite "Generate" da automatski generiše slug iz naslova
   - **Slika korica**: Upload sliku korica knjige
   - **Opis**: Kratak opis knjige (prikazuje se na kartici)
   - **Detaljni opis**: Duži opis sa formatiranjem
   - **Cena**: Cena u RSD
   - **Autor**: Ime autora
   - **Izdvojeno**: Checkmark ako želite da se knjiga prikazuje na početnoj strani
   - Ostala polja su opciona

5. Kliknite "Publish"

## CORS podešavanja

Da bi Next.js aplikacija mogla da učitava podatke iz Sanity-a:

1. Idite na [sanity.io/manage](https://www.sanity.io/manage)
2. Izaberite vaš projekat
3. Idite na "API" sekciju
4. U "CORS Origins" dodajte:
   - `http://localhost:3000` (za development)
   - Vašu production domain (npr. `https://dusanrakic.com`)

## Testiranje

Nakon što dodate knjige u Sanity:

1. Pokrenite Next.js aplikaciju: `npm run dev`
2. Otvorite `http://localhost:3000`
3. Knjige bi trebalo da se prikazuju na početnoj strani (ako su označene kao "Izdvojeno") i na `/knjige` stranici

## Pomoć

Ako imate problema sa podešavanjem:
- [Sanity dokumentacija](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
