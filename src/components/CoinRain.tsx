import { useEffect, useRef } from "react";

interface Coin {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  hue: number; // 45 = gold, 270 = purple
}

const COIN_COUNT = 40;
const ATTRACT_RADIUS = 180;
const ATTRACT_STRENGTH = 0.6;

const CoinRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const coinsRef = useRef<Coin[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize coins
    coinsRef.current = Array.from({ length: COIN_COUNT }, () => createCoin(canvas.width, canvas.height, true));

    let animationId: number;

    const drawCoin = (ctx: CanvasRenderingContext2D, coin: Coin) => {
      ctx.save();
      ctx.translate(coin.x, coin.y);
      ctx.rotate(coin.rotation);
      ctx.globalAlpha = coin.opacity;

      const s = coin.size;

      // Outer circle
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${coin.hue}, 85%, 50%)`;
      ctx.fill();

      // Inner ring
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.78, 0, Math.PI * 2);
      ctx.strokeStyle = `hsl(${coin.hue}, 70%, 35%)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Dollar sign
      ctx.fillStyle = `hsl(${coin.hue}, 60%, 30%)`;
      ctx.font = `bold ${s * 1.1}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("$", 0, 1);

      // Shine
      ctx.beginPath();
      ctx.arc(-s * 0.25, -s * 0.25, s * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${coin.hue}, 100%, 80%, 0.35)`;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      coinsRef.current.forEach((coin, i) => {
        // Gravity
        coin.vy += 0.12;
        coin.rotation += coin.rotationSpeed;

        // Cursor attraction
        const dx = mouse.x - coin.x;
        const dy = mouse.y - coin.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ATTRACT_RADIUS && dist > 0) {
          const force = (1 - dist / ATTRACT_RADIUS) * ATTRACT_STRENGTH;
          coin.vx += (dx / dist) * force;
          coin.vy += (dy / dist) * force;
        }

        // Dampen velocity slightly
        coin.vx *= 0.99;
        coin.vy *= 0.99;

        coin.x += coin.vx;
        coin.y += coin.vy;

        // Reset if off screen
        if (coin.y > canvas.height + 40 || coin.x < -40 || coin.x > canvas.width + 40) {
          coinsRef.current[i] = createCoin(canvas.width, canvas.height, false);
        }

        drawCoin(ctx, coin);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

function createCoin(w: number, h: number, initialSpread: boolean): Coin {
  return {
    x: Math.random() * w,
    y: initialSpread ? Math.random() * h : -20 - Math.random() * 60,
    vx: (Math.random() - 0.5) * 0.8,
    vy: Math.random() * 1.5 + 0.5,
    size: Math.random() * 8 + 6,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.06,
    opacity: Math.random() * 0.4 + 0.15,
    hue: Math.random() > 0.4 ? 45 : 270,
  };
}

export default CoinRain;
