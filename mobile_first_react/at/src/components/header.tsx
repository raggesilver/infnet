import { CANDIDATE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

/** Base div props */
export type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function Header(props: HeaderProps) {
  const links = [
    { href: "#bio", label: "Biografia" },
    { href: "#propostas", label: "Propostas" },
    { href: "#agenda", label: "Agenda" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header className={cn("w-full z-50 px-4 py-6", props.className)} id="top">
      <div className="wide-layout flex flex-row items-center gap-4 bg-foreground text-background px-4 py-4 rounded-2xl">
        <a href="#top" className="text-lg font-bold">
          {CANDIDATE_NAME}
        </a>

        <span className="hidden sm:block mx-auto"></span>

        {/* Mobile side-bar button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="ml-auto sm:hidden">
              <MenuIcon className="text-[1em]" />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-8">
            <SheetClose />
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
            <ul className="flex flex-col gap-4 text-lg font-medium">
              {links.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <a href={link.href} className="hover:underline">
                      {link.label}
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>

        {/* Desktop links */}
        <div className="hidden sm:contents">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
