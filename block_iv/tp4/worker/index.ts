import type { AppEvent } from "../src/types";

const mockEvents: AppEvent[] = [
  {
    id: "evt_001",
    title: "Workshop de React e TypeScript",
    description:
      "Aprenda os fundamentos de React com TypeScript através de exemplos práticos e projetos reais. Ideal para desenvolvedores que querem dar o próximo passo.",
    date: "2026-03-15T14:00:00Z",
    category: "workshop",
    location: {
      city: "São Paulo",
      state: "SP",
      fullAddress: "Rua Augusta, 1508 - Consolação",
    },
    organizerId: "org_123",
    organizerName: "Tech Community SP",
    createdAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "evt_002",
    title: "Feira de Produtos Orgânicos",
    description:
      "Feira mensal com produtores locais oferecendo frutas, verduras e produtos artesanais orgânicos direto da roça.",
    date: "2026-03-20T08:00:00Z",
    category: "fair",
    location: {
      city: "Campinas",
      state: "SP",
      fullAddress: "Praça da República - Centro",
    },
    organizerId: "org_456",
    organizerName: "Agricultores Unidos",
    createdAt: "2026-01-28T15:30:00Z",
  },
  {
    id: "evt_003",
    title: "Pelada no Parque",
    description:
      "Racha de futebol aberto para todos os níveis. Traga sua garrafa d'água e vem jogar bola com a galera!",
    date: "2026-03-22T17:00:00Z",
    category: "sports",
    location: {
      city: "Rio de Janeiro",
      state: "RJ",
      fullAddress: "Parque Lage - Jardim Botânico",
    },
    organizerId: "org_789",
    organizerName: "Futebol de Várzea RJ",
    createdAt: "2026-02-02T09:15:00Z",
  },
];

let nextId = 4;

export default {
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/events" && request.method === "GET") {
      return Response.json(mockEvents);
    }

    if (url.pathname === "/api/events" && request.method === "POST") {
      return request.json().then((body) => {
        const data = body as Omit<AppEvent, "id" | "createdAt">;
        const newEvent: AppEvent = {
          ...data,
          id: `evt_${String(nextId++).padStart(3, "0")}`,
          createdAt: new Date().toISOString(),
        };
        mockEvents.push(newEvent);
        return Response.json(newEvent, { status: 201 });
      });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
