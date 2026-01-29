import Image from "next/image";

interface BookStatsProps {
  pages?: number;
  exercisesCount?: number;
  ageRangeFrom?: number;
  ageRangeTo?: number;
  size?: "small" | "large";
}

export default function BookStats({
  pages,
  exercisesCount,
  ageRangeFrom,
  ageRangeTo,
  size = "small",
}: BookStatsProps) {
  const stats = [];

  if (pages) {
    stats.push({
      iconSrc: "/images/book.png",
      label: "Strane",
      value: pages.toString(),
    });
  }

  if (exercisesCount) {
    stats.push({
      iconSrc: "/images/ball.png",
      label: "Vežbe",
      value: exercisesCount.toString(),
    });
  }

  if (ageRangeFrom && ageRangeTo) {
    stats.push({
      iconSrc: "/images/player.png",
      label: "Uzrast",
      value: `${ageRangeFrom}-${ageRangeTo}`,
    });
  } else if (ageRangeFrom) {
    stats.push({
      iconSrc: "/images/player.png",
      label: "Uzrast",
      value: `${ageRangeFrom}+`,
    });
  }

  if (stats.length === 0) return null;

  const isLarge = size === "large";
  const iconSize = isLarge ? 40 : 24;

  return (
    <div className={`flex items-center justify-center ${isLarge ? "gap-12 py-4" : "gap-6 py-3"}`}>
      {stats.map((stat, index) => {
        return (
          <div key={index} className={`flex flex-col items-center ${isLarge ? "gap-2" : "gap-1"}`}>
            <div className={`relative ${isLarge ? "w-10 h-10" : "w-6 h-6"}`}>
              <Image
                src={stat.iconSrc}
                alt={stat.label}
                fill
                className="object-contain"
              />
            </div>
            <span className={`${isLarge ? "text-xs" : "text-[10px]"} text-muted-foreground uppercase tracking-wider`}>
              {stat.label}
            </span>
            <span className={`${isLarge ? "text-xl" : "text-sm"} font-semibold text-foreground`}>
              {stat.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
