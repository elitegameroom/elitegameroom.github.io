import { useState } from "react";
import { games } from "@/data/games";
import GameCard from "./GameCard";

const GameGrid = () => {
  const [activeTab, setActiveTab] = useState<"player" | "agent">("player");

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 gold-text-glow text-foreground">
        Game Links
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-0 mb-10">
        <button
          onClick={() => setActiveTab("player")}
          className={`px-8 py-3 text-lg font-semibold border-b-2 transition-all duration-300 ${
            activeTab === "player"
              ? "border-foreground text-foreground gold-text-glow"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Player Link
        </button>
        <div className="w-px bg-border self-stretch" />
        <button
          onClick={() => setActiveTab("agent")}
          className={`px-8 py-3 text-lg font-semibold border-b-2 transition-all duration-300 ${
            activeTab === "agent"
              ? "border-foreground text-foreground gold-text-glow"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Agent Link
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.map((game) => (
          <GameCard key={game.name} game={game} linkType={activeTab} />
        ))}
      </div>
    </section>
  );
};

export default GameGrid;
