"use client";

import { useEffect, useRef, useState } from "react";
import { Users, BookOpen, GraduationCap, Trophy } from "lucide-react";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
}

function StatItem({ icon: Icon, value, label, suffix = "" }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000; // 2 sekunde

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-muted mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-lg text-muted">{label}</div>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="py-20 px-4 text-muted bg-primary">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Rezultati koji govore
          </h2>
          <p className="text-xl  max-w-2xl mx-auto">
            Brojke koje pokazuju posvećenost trenerskoj edukaciji i razvoju
            fudbala
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <StatItem
            icon={Users}
            value={1000}
            suffix="+"
            label="Treniranih fudbalera"
          />
          <StatItem
            icon={BookOpen}
            value={10}
            suffix="+"
            label="Objavljenih knjiga"
          />
          <StatItem
            icon={GraduationCap}
            value={50}
            suffix="+"
            label="Održanih seminara"
          />
          <StatItem
            icon={Trophy}
            value={10}
            suffix="+"
            label="Godina iskustva"
          />
        </div>
      </div>
    </section>
  );
}
