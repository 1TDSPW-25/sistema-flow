import type { Article } from "../../types/home";

function Card(props: Article) {
  const { author, title, urlToImage, description } = props;

  return (
    <article className="max-w-80 grid justify-items-center gap-y-4 grid-rows-[repeat(3,max-content)_1fr]">
      <img src={urlToImage} alt={description} width={220} height={120} className="max-h-30 object-cover w-full" />
      <h2>{title}</h2>
      <p>{description}</p>
      <small className="w-full mt-auto">Por {author}</small>
    </article>
  );
}

export { Card };
