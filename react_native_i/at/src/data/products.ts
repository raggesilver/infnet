export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  // Lanches
  {
    id: "b1",
    categoryId: "burgers",
    name: "Hamburguer Classico",
    description: "Pao, carne bovina, queijo, alface e tomate.",
    price: 25.9,
    image: "https://images.pexels.com/photos/11519323/pexels-photo-11519323.jpeg?fm=jpg&w=640&h=960",
  },
  {
    id: "b2",
    categoryId: "burgers",
    name: "Cheeseburger Duplo",
    description: "Dois hamburgueres, queijo cheddar, cebola e picles.",
    price: 32.9,
    image: "https://images.pexels.com/photos/14709732/pexels-photo-14709732.jpeg?fm=jpg&w=640&h=779",
  },
  {
    id: "b3",
    categoryId: "burgers",
    name: "Frango Crocante",
    description: "Frango empanado, maionese especial e alface.",
    price: 22.9,
    image: "https://images.pexels.com/photos/13573664/pexels-photo-13573664.jpeg?fm=jpg&w=640&h=960",
  },

  // Bebidas
  {
    id: "d1",
    categoryId: "drinks",
    name: "Refrigerante Lata",
    description: "Lata 350ml. Coca-Cola, Guarana ou Fanta.",
    price: 6.9,
    image: "https://images.pexels.com/photos/7437272/pexels-photo-7437272.jpeg?fm=jpg&w=640&h=800",
  },
  {
    id: "d2",
    categoryId: "drinks",
    name: "Suco Natural",
    description: "Suco de laranja, abacaxi ou maracuja. 500ml.",
    price: 9.9,
    image: "https://images.pexels.com/photos/30900665/pexels-photo-30900665.jpeg?fm=jpg&w=640&h=960",
  },
  {
    id: "d3",
    categoryId: "drinks",
    name: "Agua Mineral",
    description: "Garrafa 500ml com ou sem gas.",
    price: 4.5,
    image: "https://images.pexels.com/photos/8217303/pexels-photo-8217303.jpeg?fm=jpg&w=640&h=427",
  },

  // Sobremesas
  {
    id: "s1",
    categoryId: "desserts",
    name: "Pudim",
    description: "Pudim de leite condensado cremoso.",
    price: 12.9,
    image: "https://images.pexels.com/photos/34474024/pexels-photo-34474024.jpeg?fm=jpg&w=640&h=960",
  },
  {
    id: "s2",
    categoryId: "desserts",
    name: "Brownie",
    description: "Brownie de chocolate com nozes.",
    price: 14.9,
    image: "https://images.pexels.com/photos/30924034/pexels-photo-30924034.jpeg?fm=jpg&w=640&h=960",
  },

  // Massas
  {
    id: "p1",
    categoryId: "pasta",
    name: "Espaguete Bolonhesa",
    description: "Massa ao molho bolonhesa com parmesao.",
    price: 29.9,
    image: "https://images.pexels.com/photos/30392947/pexels-photo-30392947.jpeg?fm=jpg&w=640&h=960",
  },
  {
    id: "p2",
    categoryId: "pasta",
    name: "Lasanha",
    description: "Lasanha de carne com molho branco e queijo.",
    price: 34.9,
    image: "https://images.pexels.com/photos/29145229/pexels-photo-29145229.jpeg?fm=jpg&w=640&h=962",
  },

  // Saladas
  {
    id: "sa1",
    categoryId: "salads",
    name: "Salada Caesar",
    description: "Alface, croutons, parmesao e molho caesar.",
    price: 19.9,
    image: "https://images.pexels.com/photos/28618642/pexels-photo-28618642.jpeg?fm=jpg&w=640&h=960",
  },
  {
    id: "sa2",
    categoryId: "salads",
    name: "Salada Tropical",
    description: "Mix de folhas, manga, tomate cereja e molho de maracuja.",
    price: 21.9,
    image: "https://images.pexels.com/photos/2862154/pexels-photo-2862154.jpeg?fm=jpg&w=640&h=960",
  },

  // Pizzas
  {
    id: "pi1",
    categoryId: "pizza",
    name: "Pizza Margherita",
    description: "Molho de tomate, mussarela e manjericao.",
    price: 39.9,
    image: "https://images.pexels.com/photos/34380267/pexels-photo-34380267.jpeg?fm=jpg&w=640&h=427",
  },
  {
    id: "pi2",
    categoryId: "pizza",
    name: "Pizza Calabresa",
    description: "Calabresa fatiada, cebola e azeitonas.",
    price: 42.9,
    image: "https://images.pexels.com/photos/31094810/pexels-photo-31094810.jpeg?fm=jpg&w=640&h=427",
  },
];
