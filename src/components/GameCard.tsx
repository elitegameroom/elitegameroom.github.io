import type { Game } from "@/data/games";

interface GameCardProps {
  game: Game;
  linkType: "player" | "agent";
}

const GameCard = ({ game, linkType }: GameCardProps) => {
  const href = linkType === "player" ? game.playerLink : game.agentLink;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:gold-border-glow hover:scale-[1.03]"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-3 text-center">
        <span className="text-sm font-semibold text-foreground gold-text-glow">
          {game.name}
        </span>
      </div>
    </a>
  );
};

export default GameCard;
