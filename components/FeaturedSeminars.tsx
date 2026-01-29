"use client";

import { Seminar } from "@/types/seminar";
import SeminarCard from "./SeminarCard";
import Link from "next/link";
import { motion } from "framer-motion";

interface FeaturedSeminarsProps {
  seminars: Seminar[];
}

export default function FeaturedSeminars({ seminars }: FeaturedSeminarsProps) {
  if (!seminars || seminars.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Seminari i edukacije
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Praktična znanja direktno sa terena - pridružite se našim seminarima
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {seminars.map((seminar, index) => (
            <SeminarCard key={seminar._id} seminar={seminar} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/seminari">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg"
            >
              Pogledajte sve seminare
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
