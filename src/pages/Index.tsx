import GameGrid from "@/components/GameGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-foreground gold-text-glow tracking-wider">
          Elite Games
        </h1>
      </header>

      {/* Game Links */}
      <main>
        <GameGrid />
      </main>
    </div>
  );
};

export default Index;
