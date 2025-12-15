import { Bus, GraduationCap, Hospital, Leaf, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export function Projects() {
  "lucide-react";

  const proposals = [
    {
      title: "Saúde para Todos",
      description:
        "Expandir e modernizar a rede municipal de saúde, garantindo atendimento de qualidade e acesso rápido para toda a população.",
      icon: Hospital,
    },
    {
      title: "Educação de Futuro",
      description:
        "Investir em escolas inovadoras, formação de professores e tecnologia para preparar nossos jovens para os desafios do século XXI.",
      icon: GraduationCap,
    },
    {
      title: "Transporte Eficiente",
      description:
        "Reestruturar o sistema de transporte público, priorizando ônibus modernos, integração modal e mais conforto para o cidadão.",
      icon: Bus,
    },
    {
      title: "Cidade Sustentável",
      description:
        "Implementar políticas ambientais para ampliar áreas verdes, promover reciclagem e combater enchentes.",
      icon: Leaf,
    },
    {
      title: "Segurança Comunitária",
      description:
        "Fortalecer a segurança nos bairros com policiamento de proximidade e programas de prevenção à violência.",
      icon: ShieldCheck,
    },
  ];

  const honorableMentions = [
    { title: "Novo viaduto em copacabana" },
    { title: "Reforma do calçadão de Ipanema" },
    { title: "Ampliação do metrô na zona norte" },
    { title: "Criação de ciclovias na zona sul" },
    { title: "Revitalização do centro histórico" },
  ];

  return (
    <section className="text-white bg-emerald-600 min-h-[50vh] -mx-4 p-4 xl:rounded-4xl transition-all space-y-8">
      <div>
        <h2
          id="propostas"
          className="text-4xl font-black leading-tight font-sans scroll-m-4"
        >
          Propostas
        </h2>
        <p>
          Essas são algumas das principais propostas do nosso plano de governo:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr gap-4 flex-wrap w-full">
        {proposals.map((proposal) => (
          <Card
            key={proposal.title}
            className="py-4 *:px-4 gap-2 bg-emerald-700/80 hover:bg-emerald-800/60 transition-colors text-white border-emerald-700/30 rounded-2xl"
          >
            <CardHeader>
              <CardTitle className="flex items-start justify-between gap-2">
                {proposal.title} {<proposal.icon />}
              </CardTitle>
            </CardHeader>
            <CardContent>{proposal.description}</CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-2xl font-bold">Outros projetos</h3>
        <ul className="list-disc list-inside space-y-1 mt-2">
          {honorableMentions.map((mention) => (
            <li key={mention.title}>{mention.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
