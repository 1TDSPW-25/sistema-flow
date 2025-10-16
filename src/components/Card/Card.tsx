import type { Article } from "../../types/home";

type CardProps = Article & {
  onVerMais: () => void;
};

function Card(props: CardProps) {
  const { author, title, urlToImage, description, onVerMais } = props;

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
        border-orange-300 border-2
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
      <h2
        className=" 
          font-[IBM_Plex_Sans] 
          text-2xl 
          font-extrabold
          text-align: left 
          text-stone-950  
          line-clamp-2
          tracking-tighter
          "
      >
        {title}
      </h2>
      <p className="text-sm font-serif text-left line-clamp-3 text-stone-8 ">
        {description}
      </p>
      <small className="w-full mt-auto text-xs text-orange-400 text-right">
        Por {author}
      </small>  

      <button onClick={onVerMais}  
      className="mt-4 text-sm text-orange-600 underline hover:text-orange-800">
        Ver mais
      </button>
    </article>
  );
}

export { Card };

