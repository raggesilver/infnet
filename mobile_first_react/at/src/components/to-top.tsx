import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ToTop() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const fn = () => setIsAtTop(window.scrollY < 5);
    window.addEventListener("scroll", fn);

    return () => {
      window.removeEventListener("scroll", fn);
    };
  }, []);

  return (
    <Button
      size="sm"
      className={cn(
        "sticky bottom-4 right-4 mt-auto mb-4 self-end opacity-100 transition-opacity duration-300 hover:[&>svg]:animate-bounce",
        isAtTop && "opacity-0",
      )}
      asChild
    >
      <a href="#top">
        De volta ao topo <ArrowUpIcon />
      </a>
    </Button>
  );
}
