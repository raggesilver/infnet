export type Book = {
  id: number;
  title: string;
  year: number;
  price: number;
  cover: string;
  description: string;
};

export const books: Book[] = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    year: 1997,
    price: 39.9,
    cover:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1170803558l/72193.jpg",
    description:
      "An orphaned boy discovers on his eleventh birthday that he is a wizard and has been accepted to Hogwarts School of Witchcraft and Wizardry. Upon arrival, Harry finds friendship, learns magic, and uncovers mysteries surrounding his past and a dark threat to the wizarding world.",
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    year: 1998,
    price: 42.9,
    cover:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1474169725i/15881.jpg",
    description:
      "Harry's second year at Hogwarts brings new dangers when mysterious attacks petrify students throughout the school. A hidden chamber containing a dangerous creature has been opened, and Harry must uncover the truth while suspicion falls upon him due to his ability to speak Parseltongue.",
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    year: 1999,
    price: 44.9,
    cover:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1630547330i/5.jpg",
    description:
      "Harry begins his third year at Hogwarts while a dangerous prisoner named Sirius Black escapes from Azkaban prison. With dementors stationed around the school, Harry must navigate new challenges while uncovering the truth behind Black's escape and his connection to Harry's past.",
  },
  {
    id: 4,
    title: "Harry Potter and the Goblet of Fire",
    year: 2000,
    price: 49.9,
    cover:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1554006152i/6.jpg",
    description:
      "Harry is mysteriously entered into the Triwizard Tournament, a dangerous magical competition between three wizarding schools, despite being underage. As he navigates tournament tasks and newfound threats, the wizarding world faces a darker turn when Voldemort's return becomes undeniable.",
  },
  {
    id: 5,
    title: "Harry Potter and the Order of the Phoenix",
    year: 2003,
    price: 54.9,
    cover:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1546910265i/2.jpg",
    description:
      "Harry enters his fifth year facing isolation and disbelief from the wizarding world about Voldemort's return. When the Ministry of Magic refuses to acknowledge the rising dark forces, Harry and his friends form a secret defense organization to prepare for the conflicts ahead.",
  },
  {
    id: 6,
    title: "Harry Potter and the Half-Blood Prince",
    year: 2005,
    price: 52.9,
    cover:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1587697303i/1.jpg",
    description:
      "In his sixth year at Hogwarts, Harry investigates dark secrets from Voldemort's past through magical memories with Dumbledore. He discovers mysterious potion annotations from the \"Half-Blood Prince\" and confronts increasingly dangerous challenges, culminating in a tragic conclusion that reshapes the series.",
  },
  {
    id: 7,
    title: "Harry Potter and the Deathly Hallows",
    year: 2007,
    price: 59.9,
    cover:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1663805647i/136251.jpg",
    description:
      "Harry, Ron, and Hermione abandon their final year at Hogwarts to embark on a dangerous quest to find and destroy Voldemort's remaining Horcruxes. Their journey culminates in an epic battle at Hogwarts where the fate of the wizarding world is decided once and for all.",
  },
];
