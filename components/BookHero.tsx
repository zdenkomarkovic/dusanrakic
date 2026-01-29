"use client";

import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const BookHero = () => {
  return (
    <div className="relative flex min-h-[100dvh]">
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[1]" />
      <Image
        src="/images/1.jpg"
        alt="Fudbal IQ - Trenerska edukacija"
        fill
        className="w-full h-[100dvh] object-cover"
        priority
      />

      <div className="relative container px-4 md:px-8 mx-auto flex flex-col gap-6 items-start justify-end z-[2] text-left pb-12 md:pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white md:text-7xl text-3xl font-bold"
        >
          Trenerska edukacija za modernu igru{" "}
          <span className="block">Fudbal IQ</span>
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white font-medium md:text-4xl text-xl max-w-3xl"
        >
          Dušan Rakić - Raka Gegenpresing
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-4 md:flex-row mt-4"
        >
          <Link href="/knjige">
            <motion.button
              whileHover={{ translateY: "-5px", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-primary-foreground to bg-primary text-white px-6 py-3 md:px-10 md:py-4 rounded-lg font-semibold text-lg shadow-lg"
            >
              Pogledajte knjige
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </Link>
          <a href={"/kontakt"}>
            <motion.button
              whileHover={{ translateY: "-5px", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm text-white border-white border-2 rounded-lg px-6 md:px-10 md:py-4 py-3 font-semibold text-lg shadow-lg"
            >
              Kontaktirajte nas
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default BookHero;
