import "./App.css";
import { Card, type CardProps } from "./components/Card";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import bachelorChowImage from "./assets/images/bachelor-chow.webp?url";
import butterbeerImage from "./assets/images/butterbear.webp?url";
import duffBeerImage from "./assets/images/duff-beer.webp?url";
import everythingBurritoImage from "./assets/images/everything-burrito.webp?url";
import krabbyPattyImage from "./assets/images/krabby-patty.webp?url";
import lembasBreadImage from "./assets/images/lembas-bread.webp?url";
import senzuBeanImage from "./assets/images/senzu-bean.webp?url";

function App() {
  const menuItems = [
    {
      image: krabbyPattyImage,
      title: "Krabby Patty",
      description:
        "Fictional hamburger in the animated series SpongeBob SquarePants",
    },
    {
      image: butterbeerImage,
      title: "Butterbeer",
      description:
        "Sweet, frothy beverage from the Harry Potter series with a butterscotch flavor",
    },
    {
      image: lembasBreadImage,
      title: "Lembas Bread",
      description:
        "Elvish waybread from The Lord of the Rings that sustains travelers for days",
    },
    {
      image: senzuBeanImage,
      title: "Senzu Bean",
      description:
        "Mystical bean from Dragon Ball that instantly restores health and energy",
    },
    {
      image: duffBeerImage,
      title: "Duff Beer",
      description:
        "Homer Simpson's favorite beer from The Simpsons, brewed in Springfield",
    },
    {
      image: everythingBurritoImage,
      title: "Everything Burrito",
      description:
        "Jake's perfect burrito from Adventure Time with all 'the goods' inside",
    },
    {
      image: bachelorChowImage,
      title: "Bachelor Chow",
      description:
        "Dog food-like meal for single men from Futurama, now with flavor",
    },
  ] satisfies CardProps[];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start">
        {menuItems.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
