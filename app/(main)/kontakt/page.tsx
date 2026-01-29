import React from "react";
import ContactForm from "@/components/ContactForm";
import { siteInfo } from "@/constants";
import { MailIcon, PhoneIcon } from "lucide-react";

export const metadata = {
  title: "Kontakt | Dušan Rakić - Raka Gegenpresing",
  description: "Kontaktirajte nas za pitanja o knjigama i trenerskoj edukaciji",
};

const KontaktPage = () => {
  return (
    <>
      <div className="bg-primary py-[70px] md:py-[61px]"></div>
      <div className="container mx-auto px-4 py-12 min-h-screen pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kontaktirajte nas
            </h1>
            <p className="text-lg max-w-6xl text-muted-foreground">
              Imate pitanje o našim knjigama ili želite da saznate više?
              Pošaljite nam poruku i odgovorićemo vam u najkraćem mogućem roku.
            </p>
          </div>
          <div className="grid md:grid-cols-2 items-center">
            <div className="mt-12 bg-muted/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Direktan kontakt
              </h2>
              <div className="space-y-4">
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="flex flex-col items-center gap-1 justify-center p-4 bg-card rounded-lg hover:shadow-lg transition-shadow"
                >
                  <p className="font-semibold">Email</p>
                  <div className="flex items-center justify-center gap-3">
                    <MailIcon className="w-6 h-6 text-primary" />
                    <p className="text-primary">{siteInfo.email}</p>
                  </div>
                </a>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {siteInfo.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone}`}
                      className="flex flex-col items-center justify-center gap-1 p-4 bg-card rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <p className="font-semibold">Telefon {index + 1}</p>
                      <div className="flex items-center justify-center gap-3">
                        <PhoneIcon className="w-6 h-6 text-primary " />
                        <p className="text-primary">{phone}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default KontaktPage;
