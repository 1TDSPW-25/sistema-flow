import type { Article } from "../../types/home";

function Card(props: Article) {
  const { author, title, urlToImage, description } = props;

  return (
    <article
      className="
        max-w-80 
        grid justify-items-center gap-y-4 
        grid-rows-[repeat(3,max-content)_1fr]
        bg-stone-50
        backdrop-blur-sm
        shadow-md hover:shadow-xl 
        rounded-2xl 
        overflow-hidden
        transition-all duration-300
        hover:-translate-y-1
        border-stone-200 border-2
        p-4
      "
    >
      <img
        src={urlToImage}
        alt={description}
        width={150}
        height={120}
        className="
          max-h-1000 
          w-full 
          rounded-xl 
          shadow-sm
        "
      />
      <h2>{title}</h2>
      <p>{description}</p>
      <small className="">Por {author}</small>
    </article>
  );
}

export { Card };
