import React, {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Matter from 'matter-js';
import { ArrowDown, Download, RotateCcw } from 'lucide-react';
import { GUN_CARDS, PALETTE, PROFILE } from '../data/portfolioData';
import PortfolioGunVisual from './PortfolioGunVisual';
import { scrollToSection } from './Navbar';

const PortfolioGun3D = lazy(() => import('./PortfolioGun3D'));

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const SIZE_DIMENSIONS = {
  sm: { w: 142, h: 64 },
  md: { w: 168, h: 72 },
  lg: { w: 192, h: 78 },
};

const MAX_ACTIVE_CARDS = 38;
const MAX_SETTLED_CARDS = 12;

const Hero = () => {
  const heroRef = useRef(null);
  const gunZoneRef = useRef(null);
  const trayRef = useRef(null);

  const engineRef = useRef(null);
  const wallsRef = useRef([]);
  const bodiesMapRef = useRef(new Map());
  const cardElMapRef = useRef(new Map());
  const rafRef = useRef(null);
  const spawnIntervalRef = useRef(null);
  const settleTimerRef = useRef(null);
  const cardIndexRef = useRef(0);
  const uidCounterRef = useRef(0);
  const isHeroVisibleRef = useRef(true);
  const isSprayingRef = useRef(false);
  const cardsRef = useRef([]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isSpraying, setIsSpraying] = useState(false);
  const [recoilCounter, setRecoilCounter] = useState(0);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'physics' | 'settled'
  const [cards, setCards] = useState([]);
  const [mount3D, setMount3D] = useState(false);
  const [trayHeight, setTrayHeight] = useState(0);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Defer 3D Canvas mount slightly so first paint & LCP stay ultra-fast (Lighthouse 90+)
  useEffect(() => {
    if (reducedMotion) return;
    const id = window.requestAnimationFrame(() => {
      setMount3D(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, [reducedMotion]);

  // Seed static grid immediately if reduced-motion is active
  const staticGridCards = useMemo(
    () =>
      GUN_CARDS.slice(0, MAX_SETTLED_CARDS).map((item, idx) => ({
        uid: `static-${idx}`,
        ...item,
      })),
    []
  );

  // Build / rebuild invisible Matter.js boundary walls inside the Hero
  const rebuildWalls = useCallback(() => {
    const engine = engineRef.current;
    const heroEl = heroRef.current;
    if (!engine || !heroEl) return;

    if (wallsRef.current.length) {
      Matter.Composite.remove(engine.world, wallsRef.current);
    }

    const rect = heroEl.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const thickness = 80;

    const wallOpts = {
      isStatic: true,
      restitution: 0.45,
      friction: 0.4,
      label: 'wall',
    };

    const floor = Matter.Bodies.rectangle(
      w / 2,
      h + thickness / 2 - 12,
      w + thickness * 2,
      thickness,
      wallOpts
    );
    const ceiling = Matter.Bodies.rectangle(
      w / 2,
      -thickness / 2,
      w + thickness * 2,
      thickness,
      wallOpts
    );
    const leftWall = Matter.Bodies.rectangle(
      -thickness / 2 + 8,
      h / 2,
      thickness,
      h * 2,
      wallOpts
    );
    const rightWall = Matter.Bodies.rectangle(
      w + thickness / 2 - 8,
      h / 2,
      thickness,
      h * 2,
      wallOpts
    );

    wallsRef.current = [floor, ceiling, leftWall, rightWall];
    Matter.Composite.add(engine.world, wallsRef.current);
  }, []);

  // Initialize Matter.js engine once
  useEffect(() => {
    if (reducedMotion) return;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.15, scale: 0.001 },
      positionIterations: 6,
      velocityIterations: 4,
    });
    engineRef.current = engine;
    rebuildWalls();

    const onResize = () => rebuildWalls();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      engineRef.current = null;
    };
  }, [reducedMotion, rebuildWalls]);

  // Pause physics loop when Hero scrolls offscreen
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Sync Matter.js body positions directly to DOM nodes at 60fps (no React re-renders per frame)
  const startPhysicsLoop = useCallback(() => {
    if (rafRef.current) return;
    let lastTime = performance.now();

    const tick = (now) => {
      const engine = engineRef.current;
      if (!engine) {
        rafRef.current = null;
        return;
      }

      const dt = Math.min(now - lastTime, 32);
      lastTime = now;

      if (isHeroVisibleRef.current) {
        Matter.Engine.update(engine, dt);

        bodiesMapRef.current.forEach((entry, uid) => {
          const el = cardElMapRef.current.get(uid);
          if (!el || entry.settled) return;
          const { body, width, height } = entry;
          const x = body.position.x - width / 2;
          const y = body.position.y - height / 2;
          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
            1
          )}px, 0) rotate(${body.angle.toFixed(3)}rad)`;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopPhysicsLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const layoutSettledCards = useCallback((cardList) => {
    const heroEl = heroRef.current;
    const trayEl = trayRef.current;
    if (!heroEl || !trayEl || !cardList.length) return;

    const trayRect = trayEl.getBoundingClientRect();
    const trayWidth = trayRect.width;

    const cols = trayWidth < 460 ? 2 : trayWidth < 760 ? 3 : 4;
    const gap = 10;
    const cellW = Math.min(182, (trayWidth - gap * (cols - 1)) / cols);
    const cellH = trayWidth < 460 ? 60 : 66;
    const rows = Math.ceil(cardList.length / cols);
    setTrayHeight(rows * cellH + Math.max(0, rows - 1) * gap);

    requestAnimationFrame(() => {
      const updatedHeroRect = heroEl.getBoundingClientRect();
      const updatedTrayRect = trayEl.getBoundingClientRect();
      const left = updatedTrayRect.left - updatedHeroRect.left;
      const top = updatedTrayRect.top - updatedHeroRect.top;

      cardList.forEach((card, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const targetX = left + col * (cellW + gap);
        const targetY = top + row * (cellH + gap);

        const el = cardElMapRef.current.get(card.uid);
        if (el) {
          el.style.width = `${cellW}px`;
          el.style.height = `${cellH}px`;
          el.style.transition =
            'transform 680ms cubic-bezier(0.22, 1.28, 0.36, 1), width 400ms ease, height 400ms ease, box-shadow 220ms ease';
          el.style.transform = `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(
            1
          )}px, 0) rotate(0deg)`;
        }
      });
    });
  }, []);

  // Settle piled cards into a tidy, clickable grid in the hero tray
  const settleIntoGrid = useCallback(() => {
    stopPhysicsLoop();

    const current = cardsRef.current;
    if (!current.length) return;

    const seenLabels = new Set();
    const kept = [];
    for (let i = current.length - 1; i >= 0; i--) {
      const card = current[i];
      if (!seenLabels.has(card.label) || current.length <= MAX_SETTLED_CARDS) {
        seenLabels.add(card.label);
        kept.unshift(card);
      }
      if (kept.length >= MAX_SETTLED_CARDS) break;
    }

    const keptIds = new Set(kept.map((c) => c.uid));
    bodiesMapRef.current.forEach((entry, uid) => {
      if (!keptIds.has(uid) && engineRef.current) {
        Matter.Composite.remove(engineRef.current.world, entry.body);
        bodiesMapRef.current.delete(uid);
      } else {
        entry.settled = true;
      }
    });

    setCards(kept);
    setPhase('settled');
    requestAnimationFrame(() => layoutSettledCards(kept));
  }, [layoutSettledCards, stopPhysicsLoop]);

  useEffect(() => {
    if (phase !== 'settled') return;
    const onResize = () => layoutSettledCards(cardsRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [phase, layoutSettledCards]);

  // Spawn one card from the gun muzzle
  const spawnCard = useCallback(() => {
    const engine = engineRef.current;
    const heroEl = heroRef.current;
    const gunEl = gunZoneRef.current;
    if (!engine || !heroEl || !gunEl) return;

    const heroRect = heroEl.getBoundingClientRect();
    const gunRect = gunEl.getBoundingClientRect();

    const isStacked = heroRect.width < 1024;
    const isMobile = heroRect.width < 640;

    // Gun muzzle is at the left-middle edge of the gun visual
    const muzzleX = Math.max(
      isMobile ? 36 : 120,
      gunRect.left - heroRect.left + gunRect.width * 0.12
    );
    const muzzleY =
      gunRect.top - heroRect.top + gunRect.height * 0.48;

    const template = GUN_CARDS[cardIndexRef.current % GUN_CARDS.length];
    cardIndexRef.current += 1;
    uidCounterRef.current += 1;
    const uid = `card-${uidCounterRef.current}`;

    const baseDims = SIZE_DIMENSIONS[template.size || 'md'];
    const scale = isMobile ? 0.72 : 0.92 + Math.random() * 0.16;
    const width = Math.round(baseDims.w * scale);
    const height = Math.round(baseDims.h * scale);

    const body = Matter.Bodies.rectangle(muzzleX, muzzleY, width, height, {
      restitution: 0.44,
      friction: 0.35,
      frictionAir: 0.012,
      density: 0.002,
      chamfer: { radius: 12 },
    });

    // Launch leftward (desktop) or fan upward-left across stacked mobile viewport
    const speedX = isStacked
      ? -3 + (Math.random() - 0.35) * 9
      : -(14 + Math.random() * 11);
    const speedY = isStacked
      ? -(8.5 + Math.random() * 5.5)
      : -(3.5 + Math.random() * 6.5);
    Matter.Body.setVelocity(body, { x: speedX, y: speedY });
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.24);

    Matter.Composite.add(engine.world, body);
    bodiesMapRef.current.set(uid, { body, width, height, settled: false });

    setRecoilCounter((c) => c + 1);
    setPhase('physics');

    setCards((prev) => {
      const next = [...prev, { uid, ...template, width, height }];
      if (next.length > MAX_ACTIVE_CARDS) {
        const removed = next.slice(0, next.length - MAX_ACTIVE_CARDS);
        removed.forEach((old) => {
          const oldEntry = bodiesMapRef.current.get(old.uid);
          if (oldEntry && engineRef.current) {
            Matter.Composite.remove(engineRef.current.world, oldEntry.body);
            bodiesMapRef.current.delete(old.uid);
          }
          cardElMapRef.current.delete(old.uid);
        });
        return next.slice(next.length - MAX_ACTIVE_CARDS);
      }
      return next;
    });
  }, []);

  // Begin spraying cards
  const startSpraying = useCallback(() => {
    if (reducedMotion || isSprayingRef.current) return;
    isSprayingRef.current = true;
    setIsSpraying(true);
    setTrayHeight(0);

    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }

    // Wake up any previously settled cards back into physics bodies
    bodiesMapRef.current.forEach((entry, uid) => {
      if (entry.settled) {
        entry.settled = false;
        const el = cardElMapRef.current.get(uid);
        if (el) {
          el.style.transition = 'none';
          el.style.width = `${entry.width}px`;
          el.style.height = `${entry.height}px`;
        }
        Matter.Body.setVelocity(entry.body, {
          x: (Math.random() - 0.5) * 5,
          y: -4 - Math.random() * 4,
        });
      }
    });

    startPhysicsLoop();
    spawnCard();
    spawnIntervalRef.current = setInterval(spawnCard, 70);
  }, [reducedMotion, spawnCard, startPhysicsLoop]);

  // Stop spraying & schedule tidy grid settle after 1.5s
  const stopSpraying = useCallback(() => {
    if (!isSprayingRef.current) return;
    isSprayingRef.current = false;
    setIsSpraying(false);

    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }

    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = setTimeout(() => {
      settleIntoGrid();
    }, 1500);
  }, [settleIntoGrid]);

  // Clear all sprayed cards
  const resetCards = useCallback(() => {
    stopSpraying();
    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
    stopPhysicsLoop();
    if (engineRef.current) {
      bodiesMapRef.current.forEach((entry) => {
        Matter.Composite.remove(engineRef.current.world, entry.body);
      });
    }
    bodiesMapRef.current.clear();
    cardElMapRef.current.clear();
    setCards([]);
    setTrayHeight(0);
    setPhase('idle');
  }, [stopPhysicsLoop, stopSpraying]);

  // Spacebar hold listener (only when not focused inside form inputs/buttons)
  useEffect(() => {
    const isTypingTarget = (target) => {
      if (!target) return false;
      const tag = target.tagName;
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target.isContentEditable
      );
    };

    const onKeyDown = (e) => {
      if (e.code === 'Space' && !isTypingTarget(e.target)) {
        // Only intercept spacebar when Hero is reasonably visible
        if (window.scrollY < window.innerHeight * 0.85) {
          e.preventDefault();
          if (!e.repeat) {
            startSpraying();
          }
        }
      }
    };

    const onKeyUp = (e) => {
      if (e.code === 'Space') {
        stopSpraying();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', stopSpraying);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', stopSpraying);
    };
  }, [startSpraying, stopSpraying]);

  const handleCardClick = (target) => {
    scrollToSection(target);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-paper paper-grain pt-24 pb-10 sm:pt-28 sm:pb-12 flex flex-col justify-between"
    >
      {/* Main Hero Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        {/* Left Editorial Column */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Giant Editorial Headline */}
          <h1 className="font-display font-extrabold text-ink text-[2.25rem] sm:text-[3.75rem] md:text-[4.5rem] xl:text-[5.25rem] leading-[0.95] tracking-[-0.035em] max-w-3xl">
            Hi, I&apos;m{' '}
            <span className="font-serif italic font-normal text-[1.12em] tracking-normal text-ink px-1">
              {PROFILE.firstName}
            </span>
            , a software developer with a curious mind.
          </h1>

          {/* Muted Subtext */}
          <p className="mt-4 sm:mt-6 text-[15px] sm:text-lg md:text-xl text-muted max-w-xl leading-relaxed font-medium">
            {PROFILE.tagline}
          </p>

          {/* Primary + Secondary Pill Buttons */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#work');
              }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-ink text-paper text-sm sm:text-base font-semibold hover:bg-lime hover:text-ink border border-ink transition-colors duration-200 shadow-sticker"
            >
              <span>See my work</span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={PROFILE.resumeUrl}
              download="Adarsh_Kesharwani_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-transparent text-ink text-sm sm:text-base font-semibold border-2 border-ink/25 hover:border-ink hover:bg-white transition-all duration-200"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download resume</span>
            </a>

            {cards.length > 0 && !reducedMotion && (
              <button
                type="button"
                onClick={resetCards}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-full text-xs font-mono uppercase tracking-wider text-muted hover:text-ink hover:bg-white/80 border border-ink/15 transition-colors"
                title="Clear sprayed cards"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Settled Cards Landing Tray (also hosts static grid for reduced-motion) */}
          <div
            ref={trayRef}
            style={
              !reducedMotion && phase === 'settled' && trayHeight
                ? { minHeight: `${trayHeight}px` }
                : undefined
            }
            className={`w-full max-w-[760px] transition-all duration-300 ${
              reducedMotion
                ? 'mt-7 min-h-[210px]'
                : phase === 'settled'
                ? 'mt-6 sm:mt-8'
                : 'mt-2 lg:mt-8 min-h-[12px] lg:min-h-[140px] pointer-events-none'
            }`}
            aria-label="Interactive portfolio tag cards"
          >
            {reducedMotion && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {staticGridCards.map((card) => {
                  const theme = PALETTE[card.color] || PALETTE.lime;
                  return (
                    <button
                      key={card.uid}
                      type="button"
                      onClick={() => handleCardClick(card.target)}
                      style={{ backgroundColor: theme.bg, color: theme.text }}
                      className="text-left rounded-2xl px-3.5 py-3 border border-ink/15 shadow-sticker hover:-translate-y-1 transition-transform"
                    >
                      <div className="font-extrabold text-xs tracking-tight uppercase truncate">
                        {card.label}
                      </div>
                      <div
                        className="text-[10px] font-mono uppercase tracking-wider mt-0.5 truncate"
                        style={{ color: theme.subText }}
                      >
                        {card.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: The Red 3D "PORTFOLIO" Money Gun */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative">
          <div
            ref={gunZoneRef}
            onPointerDown={(e) => {
              e.preventDefault();
              startSpraying();
            }}
            onPointerUp={stopSpraying}
            onPointerCancel={stopSpraying}
            onPointerLeave={stopSpraying}
            role="button"
            tabIndex={0}
            aria-label="Hold to spray portfolio cards from the red 3D portfolio gun"
            onKeyDown={(e) => {
              if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat) {
                e.preventDefault();
                startSpraying();
              }
            }}
            onKeyUp={(e) => {
              if (e.code === 'Enter' || e.code === 'Space') {
                stopSpraying();
              }
            }}
            className="w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[490px] h-[220px] sm:h-[300px] lg:h-[360px] cursor-pointer touch-none no-callout relative group focus-visible:rounded-3xl"
          >
            {/* Subtle glow halo behind gun */}
            <div
              aria-hidden="true"
              className={`absolute inset-8 rounded-full blur-3xl transition-opacity duration-300 ${
                isSpraying ? 'bg-lime/45 opacity-100' : 'bg-gunred/15 opacity-70'
              }`}
            />

            {!reducedMotion && mount3D ? (
              <WebGLErrorBoundary
                fallback={
                  <PortfolioGunVisual
                    recoil={recoilCounter % 2 === 1 && isSpraying}
                    isFiring={isSpraying}
                  />
                }
              >
                <Suspense
                  fallback={
                    <PortfolioGunVisual
                      recoil={false}
                      isFiring={isSpraying}
                    />
                  }
                >
                  <PortfolioGun3D
                    recoilCounter={recoilCounter}
                    isFiring={isSpraying}
                  />
                </Suspense>
              </WebGLErrorBoundary>
            ) : (
              <PortfolioGunVisual recoil={false} isFiring={isSpraying} />
            )}
          </div>

          {/* Mobile Touch-Hold Spray Button + Desktop Spacebar Hint */}
          <div className="mt-2 w-full flex flex-col items-center lg:items-end gap-2.5 z-20">
            {/* Mobile / Touch prominent hold-to-spray pill */}
            <button
              type="button"
              onContextMenu={(e) => e.preventDefault()}
              onPointerDown={(e) => {
                e.preventDefault();
                startSpraying();
              }}
              onPointerUp={stopSpraying}
              onPointerCancel={stopSpraying}
              onPointerLeave={stopSpraying}
              className={`lg:hidden inline-flex items-center justify-center px-7 py-3.5 rounded-full font-extrabold text-sm tracking-wide uppercase border-2 border-ink shadow-sticker touch-none no-callout transition-transform ${
                isSpraying
                  ? 'bg-lime text-ink scale-95'
                  : 'bg-gunred text-white active:scale-95'
              }`}
            >
              <span>{isSpraying ? 'Spraying...' : 'Hold to Spray'}</span>
            </button>

            {/* Bottom-right interactive hint bar */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                startSpraying();
              }}
              onPointerUp={stopSpraying}
              onPointerCancel={stopSpraying}
              onPointerLeave={stopSpraying}
              className="hidden lg:inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 backdrop-blur-sm border border-ink/15 shadow-sm hover:border-ink/40 transition-colors touch-none select-none cursor-pointer"
            >
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-ink/75">
                Hold the bar or
              </span>
              <span className={`keycap ${isSpraying ? 'is-pressed' : ''}`}>
                SPACE
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-ink/75">
                to spray
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Physics DOM Layer: Crisp, clickable tag cards synced 1:1 with Matter.js bodies */}
      {!reducedMotion && (
        <div
          aria-live="off"
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
        >
          {cards.map((card) => {
            const theme = PALETTE[card.color] || PALETTE.lime;
            const isSettled = phase === 'settled';
            return (
              <button
                key={card.uid}
                ref={(el) => {
                  if (el) {
                    cardElMapRef.current.set(card.uid, el);
                  } else {
                    cardElMapRef.current.delete(card.uid);
                  }
                }}
                type="button"
                onClick={() => handleCardClick(card.target)}
                style={{
                  width: `${card.width}px`,
                  height: `${card.height}px`,
                  backgroundColor: theme.bg,
                  color: theme.text,
                  willChange: 'transform',
                }}
                className={`pointer-events-auto absolute top-0 left-0 text-left rounded-2xl px-3.5 py-2.5 border border-ink/15 shadow-sticker flex flex-col justify-between select-none ${
                  isSettled
                    ? 'cursor-pointer hover:shadow-lift hover:z-30 hover:brightness-[1.02]'
                    : 'cursor-grab active:cursor-grabbing'
                }`}
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="font-display font-extrabold text-xs sm:text-[13px] tracking-tight uppercase leading-none truncate">
                    {card.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        card.color === 'black' ? '#C6F432' : theme.text,
                      opacity: 0.75,
                    }}
                  />
                </div>
                <span
                  className="font-mono text-[10px] font-medium uppercase tracking-wider truncate w-full"
                  style={{ color: theme.subText }}
                >
                  {card.sub}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Hero;
