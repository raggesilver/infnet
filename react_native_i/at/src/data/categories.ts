export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const categories: Category[] = [
  { id: "burgers", name: "Lanches", icon: "fast-food-outline" },
  { id: "drinks", name: "Bebidas", icon: "beer-outline" },
  { id: "desserts", name: "Sobremesas", icon: "ice-cream-outline" },
  { id: "pasta", name: "Massas", icon: "restaurant-outline" },
  { id: "salads", name: "Saladas", icon: "leaf-outline" },
  { id: "pizza", name: "Pizzas", icon: "pizza-outline" },
];
