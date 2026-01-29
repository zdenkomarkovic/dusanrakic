interface NavItem {
  title: string;
  link: string;
  list?: { title: string; link: string }[];
}

export const navList: NavItem[] = [
  {
    title: "Početna",
    link: "/",
  },
  {
    title: "Knjige",
    link: "/knjige",
  },
  {
    title: "Seminari",
    link: "/seminari",
  },
  {
    title: "O autoru",
    link: "/dusan-rakic-raka",
  },
  {
    title: "Kontakt",
    link: "/kontakt",
  },
];

export const siteInfo = {
  name: "Dušan Rakić - Raka Gegenpresing",
  title: "Fudbal IQ Trenerska edukacija za modernu igru",
  subtitle: "Teren & Tabla Trenerski centar",
  email: "ducalion@gmail.com",
  phones: ["+381655025505", "+38162553553"],
};
