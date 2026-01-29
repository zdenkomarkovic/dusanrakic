"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Seminar } from "@/types/seminar";
import { urlFor } from "@/sanity/config";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

interface SeminarCardProps {
  seminar: Seminar;
  index: number;
}

export default function SeminarCard({ seminar, index }: SeminarCardProps) {
  const getStatusBadge = () => {
    const badges = {
      active: { text: "Prijave otvorene", className: "bg-green-500/10 text-green-500" },
      full: { text: "Popunjeno", className: "bg-red-500/10 text-red-500" },
      finished: { text: "Završeno", className: "bg-gray-500/10 text-gray-500" },
      cancelled: { text: "Otkazano", className: "bg-orange-500/10 text-orange-500" },
    };
    return badges[seminar.status] || badges.active;
  };

  const badge = getStatusBadge();
  const seminarDate = new Date(seminar.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link href={`/seminari/${seminar.slug.current}`}>
        <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col cursor-pointer">
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            {seminar.coverImage ? (
              <Image
                src={urlFor(seminar.coverImage).url()}
                alt={seminar.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Calendar className="w-20 h-20 text-muted-foreground/20" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
                {badge.text}
              </span>
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-2 line-clamp-2 text-foreground">
              {seminar.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {seminar.description}
            </p>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{seminarDate.toLocaleDateString('sr-RS', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>

              {seminar.duration && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{seminar.duration}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{seminar.location}</span>
              </div>

              {seminar.maxParticipants && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Max {seminar.maxParticipants} učesnika</span>
                </div>
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  {seminar.price.toLocaleString("sr-RS")} RSD
                </span>
                {seminar.status === 'active' && (
                  <span className="text-sm font-semibold text-primary">
                    Prijavite se →
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
