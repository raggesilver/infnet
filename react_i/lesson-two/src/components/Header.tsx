export function Header() {
  const links = [
    { href: "#contact", label: "Contato" },
    { href: "#about", label: "Sobre" },
    { href: "#services", label: "Serviços" },
  ];

  return (
    <header className="bg-red-400 text-white p-4 flex justify-between items-center">
      <a href="#">My Website</a>

      <ul className="flex gap-4">
        {links.map((link) => (
          <a href={link.href}>{link.label}</a>
        ))}
      </ul>
    </header>
  );
}
