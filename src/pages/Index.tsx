import GameGrid from "@/components/GameGrid";
import CoinRain from "@/components/CoinRain";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <CoinRain />

      {/* Header */}
      <header className="relative z-10 w-full border-b border-border px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-sm">
        <h1 className="text-xl md:text-2xl font-bold text-foreground gold-text-glow tracking-wider">
          Elite Gameroom
        </h1>
      </header>

      {/* Game Links */}
      <main className="relative z-10">
        <GameGrid />
      </main>
    </div>
  );
};

export default Index;
