import {
  ExternalLinkIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  const columns = [
    {
      title: "Navegação_",
      links: [
        { name: "Início", href: "#top", external: false, icon: null },
        { name: "Biografia", href: "#bio", external: false, icon: null },
        { name: "Propostas", href: "#propostas", external: false, icon: null },
        { name: "Agenda", href: "#agenda", external: false, icon: null },
        { name: "Contato", href: "#contato", external: false, icon: null },
      ],
    },
    {
      title: "Redes Sociais_",
      links: [
        {
          name: "Facebook",
          href: "https://facebook.com",
          external: true,
          icon: FacebookIcon,
        },
        {
          name: "Twitter",
          href: "https://twitter.com",
          external: true,
          icon: TwitterIcon,
        },
        {
          name: "Instagram",
          href: "https://instagram.com",
          external: true,
          icon: InstagramIcon,
        },
        {
          name: "LinkedIn",
          href: "https://linkedin.com",
          external: true,
          icon: LinkedinIcon,
        },
        {
          name: "YouTube",
          href: "https://youtube.com",
          external: true,
          icon: YoutubeIcon,
        },
      ],
    },
  ];

  return (
    <footer className="bg-foreground text-background m-4 rounded-2xl p-4">
      <div className="wide-layout space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {columns.map((column) => (
            <section key={column.title} className="flex flex-col space-y-2">
              <h2 className="text-lg font-bold">{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flex gap-1 not-hover:[&>svg]:hidden"
                      target={link.external ? "_blank" : "_self"}
                    >
                      {link.icon && <link.icon className="w-[1em] block!" />}
                      {link.name}{" "}
                      {link.external && (
                        <ExternalLinkIcon className="w-[1em]" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <section className="flex flex-col space-y-6 col-span-1 sm:col-span-2 xl:col-span-3">
            <div>
              <h2 id="contato" className="text-lg font-bold">
                Contato_
              </h2>
              <p>
                Tem algum projeto em mente? Entre em contato. Vamos mudar o
                futuro da nossa cidade juntos!
              </p>
            </div>
            <Button
              asChild
              className="sm:self-start flex items-center gap-2"
              variant="secondary"
            >
              <a href="mailto:paulo.vqueiroz@al.infnet.edu.br">
                Fale Comigo <MailIcon />
              </a>
            </Button>
          </section>
        </div>
        <a href="https://raggesilver.com" target="_blank">
          <span className="text-sm text-muted-foreground">
            &copy; 2025 Queiroz, Paulo.
          </span>
        </a>
      </div>
    </footer>
  );
}
