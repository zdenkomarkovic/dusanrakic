"use client";

import Image from "next/image";
import Logo from "../public/android-chrome-192x192.png";
import Link from "next/link";
import { ChevronDownIcon, MenuIcon, PhoneIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { navList } from "@/constants/index";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import CartIcon from "./CartIcon";
import TopComponent from "./TopComponent";

const mobTitleStyles = "text-lg py-2";

const MobileMenu = ({ scrolled }: { scrolled: boolean }) => (
  <Sheet>
    <SheetTrigger className="lg:hidden">
      <motion.div
        animate={{ color: scrolled ? "hsl(var(--foreground))" : "#ffffff" }}
      >
        <MenuIcon className="cursor-pointer" />
      </motion.div>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle></SheetTitle>
        <SheetContent>
          <ul>
            {navList.map((item, index) => {
              if (item.list)
                return (
                  <Fragment key={index}>
                    <Accordion type="single" collapsible>
                      <AccordionItem className="border-none" value="item-1">
                        <motion.div
                          whileHover={{ color: "hsl(var(--primary))" }}
                        >
                          <AccordionTrigger
                            className={`${mobTitleStyles} hover:no-underline`}
                          >
                            {item.title}
                          </AccordionTrigger>
                        </motion.div>
                        <AccordionContent>
                          {item.list.map((link, index2) => (
                            <Link
                              className="pl-6 block font-light py-2"
                              key={`${index}.${index2}`}
                              href={link.link}
                            >
                              <motion.li
                                whileHover={{ color: "hsl(var(--primary))" }}
                              >
                                {link.title}
                              </motion.li>
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Fragment>
                );
              return (
                <Link key={index} href={item.link}>
                  <motion.li
                    whileHover={{ color: "hsl(var(--primary))" }}
                    className={mobTitleStyles}
                  >
                    <SheetTrigger>{item.title}</SheetTrigger>
                  </motion.li>
                </Link>
              );
            })}
          </ul>
        </SheetContent>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);

const DesktopNav = ({ scrolled }: { scrolled: boolean }) => (
  <ul className="hidden gap-8 lg:flex  text-xl">
    {navList.map((item, index) => {
      if (item.list)
        return (
          <HoverCard key={index} openDelay={0} closeDelay={50}>
            <HoverCardTrigger>
              <motion.div
                animate={{
                  color: scrolled ? "hsl(var(--foreground))" : "#ffffff",
                }}
                whileHover={{ color: "hsl(var(--primary))", scale: 1.1 }}
                className="flex gap-1 transition-colors"
              >
                {item.title}
                <ChevronDownIcon className="w-[18px]" />
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="p-0">
              {item.list.map((link, index2) => (
                <motion.li
                  key={`${index}.${index2}`}
                  whileHover={{
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                  }}
                >
                  <Link className="px-2 py-2 block" href={link.link}>
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </HoverCardContent>
          </HoverCard>
        );
      return (
        <Link key={index} href={item.link}>
          <motion.li
            animate={{ color: scrolled ? "hsl(var(--foreground))" : "#ffffff" }}
            className="transition-colors underline-animation"
            whileHover={{ scale: 1.1 }}
          >
            {item.title}
          </motion.li>
        </Link>
      );
    })}
  </ul>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const HandleScroll = () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    };

    document.addEventListener("scroll", HandleScroll);

    return () => {
      document.removeEventListener("scroll", HandleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[20]">
      <TopComponent />
      <div
        className={`flex justify-center ${
          scrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md"
            : "bg-transparent"
        }    transition-colors`}
      >
        <nav
          className={`flex items-center justify-between px-8 py-3 max-w-[80rem] w-full font-bold transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          <Link href="/" className=" flex gap-3 items-center">
            <Image
              src={Logo}
              alt="dm rustic 24"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="text-center">
              <p>Trenerski</p>
              <p>centar</p>
            </div>
          </Link>
          <DesktopNav scrolled={scrolled} />
          <div className="flex items-center gap-4">
            <CartIcon scrolled={scrolled} />
          </div>
          <MobileMenu scrolled={scrolled} />
        </nav>
      </div>{" "}
    </header>
  );
}
