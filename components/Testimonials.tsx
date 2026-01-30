"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  initials: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    initials: "M.P.",
    text: "Rakine knjige su mi pomogle da potpuno promenim pristup treningu. Vežbe su jasno objašnjene, a praktična primena je odlična. Posebno su mi korisni bili materijali o kondicijskoj pripremi mladih igrača.",
    rating: 5,
  },
  {
    initials: "N.J.",
    text: "Seminari koje organizuje Dušan su na profesionalnom nivou. Svaki put kada prisustvujem, učim nešto novo što mogu odmah da primenim na svom timu. Preporuka svim trenerima!",
    rating: 5,
  },
  {
    initials: "S.R.",
    text: "Kao kondicijski trener, pronašao sam u Rakinim publikacijama ogromnu vrednost. Metodologija je moderna, prilagođena srpskim uslovima i lako primenljiva. Obavezna literatura!",
    rating: 5,
  },
  {
    initials: "A.S.",
    text: "Izvrsne knjige sa dosta praktičnih primera. Sve što sam naučio sam odmah primenio u radu sa svojim timom. Posebno su mi korisne vežbe za razvoj brzine i eksplozivnosti.",
    rating: 5,
  },
  {
    initials: "D.M.",
    text: "Rakino iskustvo iz Crvene zvezde se jasno vidi u kvalitetu materijala. Ovo nije običan teoretski pristup - sve je bazirano na praksi vrhunskog fudbala. Izuzetno vredan izvor znanja.",
    rating: 5,
  },
  {
    initials: "I.V.",
    text: "Odlična stručna literatura koja mi je pomogla da shvatim moderne koncepte fudbala. Materijali su pregledni i lako primenljivi na terenu. Svaka preporuka!",
    rating: 5,
  },
  {
    initials: "P.K.",
    text: "Knjige su mi otvorile potpuno novu perspektivu na trening. Kvalitetni saveti i praksa iz vrhunskog fudbala. Nezamenljiv resurs za sve koji žele da napreduju.",
    rating: 5,
  },
  {
    initials: "T.N.",
    text: "Profesionalno odrađeni materijali sa dosta primera iz prakse. Sve što sam primenio je dalo rezultate na terenu. Definitivno vredno investicije.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(testimonials.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const infiniteTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slidePercentage = isMobile ? 100 : 100 / 3;

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= testimonials.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - testimonials.length);
    } else if (currentIndex < testimonials.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + testimonials.length);
    }
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide();
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Šta su rekli o Raki
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Iskustva onih koji su koristili naše knjige i seminare
          </p>
        </div>

        <div className="relative overflow-hidden touch-pan-y">
          <motion.div
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            className={`flex select-none ${
              isTransitioning
                ? "transition-transform duration-500 ease-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * slidePercentage}%)`,
              touchAction: "pan-y",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-card rounded-2xl shadow-xl p-8 relative h-full">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />

                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-lg text-foreground mb-6 leading-relaxed min-h-[180px]">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div>
                    <p className="font-bold text-lg text-foreground">
                      {testimonial.initials}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation buttons - Hidden on mobile */}
          <div className="hidden md:flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(testimonials.length + index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex % testimonials.length === index
                      ? "bg-primary w-8"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Mobile indicators only */}
          <div className="flex md:hidden justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(testimonials.length + index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex % testimonials.length === index
                    ? "bg-primary w-8"
                    : "bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
