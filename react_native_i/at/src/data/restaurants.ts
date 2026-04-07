export type Restaurant = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  menuHighlight: string;
  menuHighlightPrice: number;
};

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Burger Centro",
    address: "Rua do Ouvidor, 50 - Centro, Rio de Janeiro",
    latitude: -22.9027,
    longitude: -43.1778,
    menuHighlight: "Smash Burger Duplo",
    menuHighlightPrice: 34.9,
  },
  {
    id: "r2",
    name: "Sabor Carioca",
    address: "Av. Rio Branco, 120 - Centro, Rio de Janeiro",
    latitude: -22.9049,
    longitude: -43.1764,
    menuHighlight: "Feijoada Completa",
    menuHighlightPrice: 45.0,
  },
  {
    id: "r3",
    name: "Pasta & Vino",
    address: "Rua da Assembleia, 35 - Centro, Rio de Janeiro",
    latitude: -22.9068,
    longitude: -43.1752,
    menuHighlight: "Fettuccine Alfredo",
    menuHighlightPrice: 38.9,
  },
  {
    id: "r4",
    name: "Sushi Lapa",
    address: "Rua da Lapa, 80 - Centro, Rio de Janeiro",
    latitude: -22.9125,
    longitude: -43.1802,
    menuHighlight: "Combo Sashimi 20 pecas",
    menuHighlightPrice: 59.9,
  },
  {
    id: "r5",
    name: "Acai do Rio",
    address: "Rua Senador Dantas, 22 - Centro, Rio de Janeiro",
    latitude: -22.9095,
    longitude: -43.1735,
    menuHighlight: "Acai 500ml Completo",
    menuHighlightPrice: 22.9,
  },
  {
    id: "r6",
    name: "Pizzaria Napoli",
    address: "Rua Buenos Aires, 150 - Centro, Rio de Janeiro",
    latitude: -22.9055,
    longitude: -43.1808,
    menuHighlight: "Pizza Quatro Queijos",
    menuHighlightPrice: 49.9,
  },
  {
    id: "r7",
    name: "Cantina da Praca",
    address: "Praca XV de Novembro, 10 - Centro, Rio de Janeiro",
    latitude: -22.9029,
    longitude: -43.1729,
    menuHighlight: "Lasanha Bolonhesa",
    menuHighlightPrice: 36.9,
  },
  {
    id: "r8",
    name: "Grill Express",
    address: "Rua Primeiro de Marco, 65 - Centro, Rio de Janeiro",
    latitude: -22.9037,
    longitude: -43.1745,
    menuHighlight: "Picanha na Chapa",
    menuHighlightPrice: 52.9,
  },
  {
    id: "r9",
    name: "Cafe Imperial",
    address: "Rua da Quitanda, 30 - Centro, Rio de Janeiro",
    latitude: -22.9042,
    longitude: -43.1755,
    menuHighlight: "Pao de Queijo com Cafe",
    menuHighlightPrice: 14.9,
  },
  {
    id: "r10",
    name: "Veggie House",
    address: "Rua Sete de Setembro, 90 - Centro, Rio de Janeiro",
    latitude: -22.9063,
    longitude: -43.1788,
    menuHighlight: "Bowl Vegano Completo",
    menuHighlightPrice: 32.9,
  },
];
