export type CardProps = {
  image: string;
  title: string;
  description: string;
};

export function Card({ image, title, description }: CardProps) {
  return (
    <article className="border-1 rounded-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full aspect-square object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold m-0 mb-2">{title}</h2>
        <p className="text-foreground/60 m-0">{description}</p>
      </div>
    </article>
  );
}
