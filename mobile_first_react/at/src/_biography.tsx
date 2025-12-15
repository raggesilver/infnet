import portraitUrl from "@/assets/portrait.webp?url";

export function Biography() {
  return (
    <section className="font-serif space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
      <div className="space-y-4">
        <h2
          id="bio"
          className="text-4xl font-black leading-tight font-sans scroll-m-4"
        >
          Biografia
        </h2>
        <p className="leading-relaxed">
          Marco Madureira, carioca de nascimento e apaixonado pelo Rio de
          Janeiro, construiu sua trajetória dedicando-se à gestão pública e ao
          desenvolvimento social da cidade. Formado em Administração Pública
          pela UFRJ, Marco atuou por mais de 15 anos em projetos que promoveram
          melhorias na educação, saúde e mobilidade urbana, sempre pautado pela
          ética, transparência e diálogo com a população. Agora, como candidato
          a prefeito, ele traz uma visão inovadora e inclusiva para transformar
          o Rio em uma cidade mais justa e sustentável para todos.
        </p>
      </div>
      <div className="lg:col-span-2">
        <img
          src={portraitUrl}
          alt="Portrato de Marco Madureira no podcast Podpah"
          className="rounded-4xl h-auto object-cover bg-foreground/20"
        />
      </div>
    </section>
  );
}
