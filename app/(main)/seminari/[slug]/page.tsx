"use client";

import { client, urlFor } from "@/sanity/config";
import { Seminar } from "@/types/seminar";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  Calendar,
  MapPin,
  Clock,
  Users,
  User,
  CheckCircle,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PortableTextImage from "@/components/PortableTextImage";

const portableTextComponents = {
  types: {
    image: PortableTextImage,
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-justify">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 clear-both">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-6 mb-3 clear-both">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
    ),
  },
};

export default function SeminarDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeminar() {
      try {
        const query = `*[_type == "seminar" && slug.current == $slug][0]`;
        const fetchedSeminar = await client.fetch(query, { slug });
        setSeminar(fetchedSeminar);
      } catch (error) {
        console.error("Error fetching seminar:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSeminar();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl text-center py-20">
          <p className="text-xl text-muted-foreground">Učitavanje...</p>
        </div>
      </main>
    );
  }

  if (!seminar) {
    notFound();
  }

  const seminarDate = new Date(seminar.date);
  const getStatusBadge = () => {
    const badges = {
      active: { text: "Prijave otvorene", className: "bg-green-500 text-white" },
      full: { text: "Popunjeno", className: "bg-red-500 text-white" },
      finished: { text: "Završeno", className: "bg-gray-500 text-white" },
      cancelled: { text: "Otkazano", className: "bg-orange-500 text-white" },
    };
    return badges[seminar.status] || badges.active;
  };

  const badge = getStatusBadge();

  return (
    <main className="min-h-screen">
      <div className="bg-primary py-[70px] md:py-16"></div>
      <div className="container px-2 py-5 mx-auto max-w-7xl">
        <Link
          href="/seminari"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Nazad na sve seminare
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="sticky top-28">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
                {seminar.coverImage ? (
                  <Image
                    src={urlFor(seminar.coverImage).url()}
                    alt={seminar.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <Calendar className="w-32 h-32 text-foreground/20" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${badge.className}`}>
                {badge.text}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold mb-6">
              {seminar.title}
            </h1>

            <div className="bg-card rounded-xl p-6 mb-6 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Datum</p>
                  <p className="text-muted-foreground">
                    {seminarDate.toLocaleDateString('sr-RS', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {seminar.duration && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Trajanje</p>
                    <p className="text-muted-foreground">{seminar.duration}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Lokacija</p>
                  <p className="text-muted-foreground">{seminar.location}</p>
                </div>
              </div>

              {seminar.instructor && (
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Predavač</p>
                    <p className="text-muted-foreground">{seminar.instructor}</p>
                  </div>
                </div>
              )}

              {seminar.maxParticipants && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Broj učesnika</p>
                    <p className="text-muted-foreground">Maksimalno {seminar.maxParticipants}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-primary/10 rounded-xl p-6 mb-6">
              <p className="text-4xl font-bold text-primary mb-2">
                {seminar.price.toLocaleString('sr-RS')} RSD
              </p>
              <p className="text-muted-foreground">Cena po učesniku</p>
            </div>

            {seminar.status === 'active' && (
              <div className="space-y-4 mb-8">
                <a href="tel:+381655025505">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg w-full shadow-lg"
                  >
                    Pozovite za prijavu
                  </motion.button>
                </a>
                <a href="mailto:ducalion@gmail.com">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary transition-colors duration-500 w-full"
                  >
                    Pošaljite email za prijavu
                  </motion.button>
                </a>
              </div>
            )}

            {seminar.topics && seminar.topics.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Teme seminara</h3>
                <ul className="space-y-2">
                  {seminar.topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {seminar.longDescription && seminar.longDescription.length > 0 && (
          <div className="mt-20 bg-primary/5 rounded-xl p-8">
            <h2 className="text-2xl text-foreground font-bold mb-6 text-center">
              O seminaru
            </h2>
            <div className="text-foreground text-left overflow-auto">
              <PortableText
                value={seminar.longDescription}
                components={portableTextComponents}
              />
              <div className="clear-both"></div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
