"use client";

import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/config";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    telefon: "",
    napomena: "",
  });

  if (items.length === 0) {
    router.push("/korpa");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/narudzbina", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          stavke: items.map((item) => ({
            naslov: item.book.title,
            autor: item.book.author,
            cena: item.book.price,
            kolicina: item.quantity,
          })),
          ukupno: getTotalPrice(),
        }),
      });

      if (response.ok) {
        clearCart();
        router.push("/uspesna-narudzbina");
      } else {
        toast.error("Došlo je do greške. Pokušajte ponovo.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Došlo je do greške. Pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen">
      <div className="bg-primary py-[70px] md:py-[61px]"></div>
      <div className="container  px-2 mx-auto max-w-6xl">
        <h1 className="text-3xl text-center mt-6 md:mt-8 md:text-4xl font-bold mb-8">
          Završite narudžbinu
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-card rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">Vaši podaci</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Ime *
                    </label>
                    <input
                      type="text"
                      name="ime"
                      required
                      value={formData.ime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Prezime *
                    </label>
                    <input
                      type="text"
                      name="prezime"
                      required
                      value={formData.prezime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Knjige ćete dobiti na ovaj email nakon potvrde narudžbine
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="telefon"
                    required
                    value={formData.telefon}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Napomena (opciono)
                  </label>
                  <textarea
                    name="napomena"
                    value={formData.napomena}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Dodatne informacije ili pitanja..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-6 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                      Slanje...
                    </>
                  ) : (
                    "Pošaljite narudžbinu"
                  )}
                </motion.button>
              </form>
            </div>

            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">
                Šta se dešava posle narudžbine?
              </h3>
              <ol className="space-y-2 text-sm text-foreground">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <span>Primićete potvrdu narudžbine na vaš email</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <span>Kontaktiraćemo vas radi dogovora o plaćanju</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  <span>
                    Nakon uplate, knjige u elektronskom formatu stižu na vaš
                    email
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Vaša narudžbina</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.book._id} className="flex gap-3">
                    <div className="relative w-16 h-20 flex-shrink-0">
                      {item.book.coverImage ? (
                        <Image
                          src={urlFor(item.book.coverImage)
                            .width(100)
                            .height(150)
                            .url()}
                          alt={item.book.title}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted rounded" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {item.book.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.book.author}
                      </p>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-muted-foreground">
                          x{item.quantity}
                        </span>
                        <span className="font-semibold text-sm">
                          {(item.book.price * item.quantity).toLocaleString(
                            "sr-RS"
                          )}{" "}
                          RSD
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-2">
                  <span>Ukupno:</span>
                  <span className="text-primary">
                    {getTotalPrice().toLocaleString("sr-RS")} RSD
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bez troškova dostave
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
