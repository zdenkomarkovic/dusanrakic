# Korpa i Checkout Sistem

## Kako funkcioniše

Implementiran je kompletan sistem korpe i checkout-a **BEZ online plaćanja**. Korisnici dodaju knjige u korpu, popunjavaju svoje podatke, i šalju narudžbinu na email. Nakon toga vi ih kontaktirate radi dogovora o plaćanju.

## Korisnički tok

1. **Dodavanje u korpu**
   - Korisnik klikom na "Dodaj u korpu" dodaje knjigu
   - Korpa se čuva u `localStorage` (ostaje i nakon zatvaranja browsera)
   - Ikonica korpe u header-u pokazuje broj artikala

2. **Pregled korpe** (`/korpa`)
   - Korisnik vidi sve dodane knjige
   - Može ukloniti pojedinačnu knjigu
   - Može isprazniti celu korpu
   - Vidi ukupnu cenu
   - Klikom na "Nastavite sa narudžbinom" ide na checkout

3. **Checkout** (`/checkout`)
   - Korisnik unosi:
     - Ime i prezime
     - Email (na koji će dobiti knjige)
     - Telefon
     - Napomena (opciono)
   - Vidi rezime narudžbine
   - Klikom na "Pošaljite narudžbinu" šalje podatke

4. **Slanje narudžbine**
   - Narudžbina se šalje na vaš email (`ducalion@gmail.com`)
   - Kupac dobija potvrdu na svoj email
   - Korpa se automatski prazni
   - Korisnik se preusmerava na stranicu zahvalnice

5. **Uspešna narudžbina** (`/uspesna-narudzbina`)
   - Potvrda da je narudžbina poslata
   - Obaveštenje šta se dešava dalje
   - Linkovi za nastavak kupovine

## Email notifikacije

### Email za vas (admin)
Dobijate detaljnu narudžbinu sa:
- Podaci kupca (ime, prezime, email, telefon, napomena)
- Lista svih knjiga sa količinom i cenama
- Ukupan iznos
- Uputstva šta dalje (kontaktiraj kupca, dogovori plaćanje, pošalji knjige)

### Email za kupca (potvrda)
Kupac dobija potvrdu sa:
- Lista naručenih knjiga
- Ukupan iznos
- Obaveštenje da će biti kontaktiran
- Koraci do prijema knjiga
- Kontakt informacije za pitanja

## Podešavanje SMTP za slanje email-ova

Otvorite `.env.local` i popunite SMTP podatke:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vas_email@gmail.com
SMTP_PASS=vasa_app_lozinka
```

### Za Gmail:

1. Idite na https://myaccount.google.com/
2. Security → 2-Step Verification (uključite ako već nije)
3. Security → App passwords
4. Kreirajte novu app password za "Mail" / "Other"
5. Kopirajte generisanu lozinku (16 karaktera)
6. Paste u `.env.local` kao `SMTP_PASS`

### Za druge email provajdere:

- **Outlook/Hotmail**: `smtp.office365.com`, port `587`
- **Yahoo**: `smtp.mail.yahoo.com`, port `587`
- **Mailjet** (preporučeno za produkciju): Besplatan do 6000 email-ova mesečno

## Funkcionalnosti korpe

### CartContext (`/lib/cart-context.tsx`)
- `addToCart(book)` - Dodaje knjigu ili povećava količinu
- `removeFromCart(bookId)` - Uklanja knjigu iz korpe
- `clearCart()` - Prazni celu korpu
- `getTotalPrice()` - Vraća ukupnu cenu
- `getItemCount()` - Vraća ukupan broj knjiga

### localStorage
Korpa se automatski čuva u browser-u i ostaje i nakon:
- Refresha stranice
- Zatvaranja browser-a
- Ponovnog otvaranja sajta

## Stranice

- `/knjige` - Lista knjiga sa dugmetom "Dodaj u korpu"
- `/knjige/[slug]` - Detalji knjige sa dugmetom "Dodaj u korpu"
- `/korpa` - Pregled korpe
- `/checkout` - Forma za podatke i slanje narudžbine
- `/uspesna-narudzbina` - Zahvalnica nakon narudžbine

## API Endpoint

`POST /api/narudzbina`

Prihvata JSON:
```json
{
  "ime": "Petar",
  "prezime": "Petrović",
  "email": "petar@example.com",
  "telefon": "+381641234567",
  "napomena": "Molim brzu isporuku",
  "stavke": [
    {
      "naslov": "Moderna taktika u fudbalu",
      "autor": "Dušan Rakić",
      "cena": 1990,
      "kolicina": 2
    }
  ],
  "ukupno": 3980
}
```

Šalje 2 email-a:
1. Admin email (ducalion@gmail.com) - sa detaljima narudžbine
2. Kupac email - potvrda narudžbine

## Testiranje

1. Pokrenite dev server: `npm run dev`
2. Otvorite http://localhost:3007
3. Idite na "Knjige" i dodajte neku u korpu
4. Kliknite na ikonicu korpe u header-u
5. Kliknite "Nastavite sa narudžbinom"
6. Popunite formu sa pravim email-om
7. Kliknite "Pošaljite narudžbinu"
8. Proverite inbox (i spam folder)

## Customizacija

### Promena email primаoca narudžbine
U `/app/api/narudzbina/route.ts`, linija ~114:
```typescript
to: "ducalion@gmail.com",  // Promenite ovo
```

### Promena email subject-a
U `/app/api/narudzbina/route.ts`, linija ~115:
```typescript
subject: `Nova narudžbina od ${ime} ${prezime}`,  // Promenite ovo
```

### Promena izgleda email-a
HTML šabloni su u `/app/api/narudzbina/route.ts` - možete ih customizovati.

## Unapređenja za budućnost

Možete dodati:
- **Kuponi/Popusti**: Polje za kupon kod u checkout-u
- **Online plaćanje**: Integracija sa Stripe, PayPal, ili domaći gateway
- **PDF generisanje**: Slanje PDF računa uz email
- **Order history**: Admin panel za pregled svih narudžbina
- **Email automation**: Automatsko slanje knjiga nakon potvrde plaćanja

## Troubleshooting

**Problem**: Email-ovi se ne šalju
- Proverite `.env.local` SMTP podatke
- Proverite da li ste omogućili "App passwords" za Gmail
- Proverite spam folder
- Proverite konzolu za greške

**Problem**: Korpa se ne čuva
- Proverite da browser podržava localStorage
- Očistite browser cache i pokušajte ponovo

**Problem**: Checkout ne radi
- Provere network tab u browser dev tools
- Proverite da API route `/api/narudzbina` vraća 200 OK
