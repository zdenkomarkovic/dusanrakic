"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/android-chrome-192x192.png";
import { MailIcon, PhoneIcon } from "lucide-react";
import { siteInfo } from "@/constants";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-t from-primary via-primary/90 to-primary/50 py-12 mt-20 text-muted"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center">
            <Link href="/" className="flex gap-3 items-center mb-4">
              <Image
                src={Logo}
                alt="Trenerski centar"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="text-center font-bold">
                <p className="text-2xl md:text-4xl ">Trenerski centar</p>
              </div>
            </Link>
            <h3 className="font-bold md:text-4xl mb-4">{siteInfo.name}</h3>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl mb-4">Brzi linkovi</h3>
            <ul className="space-y-2 text-center">
              <li>
                <Link
                  href="/"
                  className="text-muted hover:text-blue-100 transition-colors"
                >
                  Početna
                </Link>
              </li>
              <li>
                <Link
                  href="/knjige"
                  className="text-muted hover:text-blue-100 transition-colors"
                >
                  Knjige
                </Link>
              </li>
              <li>
                <Link
                  href="/dusan-rakic-raka"
                  className="text-muted hover:text-blue-100 transition-colors"
                >
                  O autoru
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-muted hover:text-blue-100 transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl mb-4">Kontakt</h3>
            <div className="space-y-3 flex flex-col items-center">
              <a
                href={`mailto:${siteInfo.email}`}
                className="flex items-center gap-2 text-muted hover:text-blue-100 transition-colors"
              >
                <MailIcon className="w-5 h-5" />
                {siteInfo.email}
              </a>
              {siteInfo.phones.map((phone, index) => (
                <a
                  key={index}
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-muted hover:text-blue-100 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4 border-t border-border pt-8">
          <p className="text-muted">
            &copy; {new Date().getFullYear()} {siteInfo.name}. Sva prava
            zadržana.
          </p>
          <a
            href="https://www.manikamwebsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-blue-100 transition-colors"
          >
            Izrada sajta: <span className="font-bold">ManikamWebSolutions</span>
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
