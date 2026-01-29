import Image from "next/image";
import { urlFor } from "@/sanity/config";

interface PortableTextImageProps {
  value: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
    position?: "left" | "center" | "right";
    caption?: string;
  };
}

export default function PortableTextImage({ value }: PortableTextImageProps) {
  const { asset, alt, position = "center", caption } = value;

  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "mx-auto my-6 md:float-left md:mr-6 md:mb-6 w-full md:max-w-[45%]";
      case "right":
        return "mx-auto my-6 md:float-right md:ml-6 md:mb-6 w-full md:max-w-[45%]";
      case "center":
      default:
        return "mx-auto my-8 w-full max-w-3xl";
    }
  };

  const imageUrl = urlFor(asset).width(1200).url();

  return (
    <figure className={getPositionClasses()}>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-muted">
        <Image
          src={imageUrl}
          alt={alt || "Slika"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground italic text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
