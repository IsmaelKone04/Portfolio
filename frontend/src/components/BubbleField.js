import { useEffect, useRef } from 'react';

// Décor interactif en arrière-plan du Hero : des bulles bleues translucides
// qui dérivent doucement et éclatent en micro-particules au survol ou au clic,
// avant de réapparaître ailleurs. Purement décoratif (aria-hidden), le canvas
// se contente de couvrir les zones vides du Hero — le contenu (texte, liens)
// reste au-dessus et garde ses propres interactions.
const BUBBLE_COUNT = 14;
const BUBBLE_RGB = '37, 99, 235';
const PARTICLE_RGBS = ['56, 189, 248', '255, 255, 255', '37, 99, 235'];

function spawnBubble(width, height) {
  const radius = 10 + Math.random() * 22;
  return {
    x: Math.random() * width,
    y: height + radius + Math.random() * height * 0.5,
    radius,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -0.15 - Math.random() * 0.25,
    opacity: 0,
    targetOpacity: 0.14 + Math.random() * 0.18,
    popped: false,
  };
}

const BubbleField = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let bubbles = Array.from({ length: BUBBLE_COUNT }, () => {
      const b = spawnBubble(width, height);
      b.y = Math.random() * height;
      b.opacity = b.targetOpacity;
      return b;
    });

    if (reduceMotion) {
      ctx.clearRect(0, 0, width, height);
      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${BUBBLE_RGB}, ${b.opacity})`;
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      return () => window.removeEventListener('resize', resize);
    }

    let particles = [];

    const popBubble = (bubble) => {
      if (bubble.popped) return;
      bubble.popped = true;
      for (let i = 0; i < 10; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.8;
        particles.push({
          x: bubble.x,
          y: bubble.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: PARTICLE_RGBS[Math.floor(Math.random() * PARTICLE_RGBS.length)],
          size: 1 + Math.random() * 2,
        });
      }
    };

    const handlePointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      bubbles.forEach((b) => {
        if (!b.popped && Math.hypot(b.x - px, b.y - py) < b.radius + 4) {
          popBubble(b);
        }
      });
    };

    canvas.addEventListener('mousemove', handlePointer);
    canvas.addEventListener('click', handlePointer);

    let frame;
    const step = () => {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((b) => {
        if (b.popped) return;
        b.opacity += (b.targetOpacity - b.opacity) * 0.04;
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) {
          b.y = height + b.radius;
          b.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${BUBBLE_RGB}, ${b.opacity})`;
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${BUBBLE_RGB}, ${Math.min(b.opacity + 0.15, 0.5)})`;
        ctx.stroke();
      });

      bubbles = bubbles.filter((b) => !b.popped);
      while (bubbles.length < BUBBLE_COUNT) {
        bubbles.push(spawnBubble(width, height));
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.015;
        p.life -= 0.025;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(p.life, 0)})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      particles = particles.filter((p) => p.life > 0);

      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handlePointer);
      canvas.removeEventListener('click', handlePointer);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
  );
};

export default BubbleField;
