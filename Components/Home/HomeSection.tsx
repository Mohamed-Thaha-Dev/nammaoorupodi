"use client";
import Image from "next/image";
import Link from "next/link";
import React, { lazy, useEffect, useMemo, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/* =========================
   Types
========================= */

type Source = { mp4?: string; webm?: string; ogg?: string };
type VideoLike = string | Source;

type Eases = {
  container?: string; // e.g. "expo.out"
  overlay?: string; // e.g. "expo.out"
  text?: string; // e.g. "power3.inOut"
};

export type HeroScrollVideoProps = {
  // Top headline area
  title?: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  button?: ReactNode;
  credits?: ReactNode;

  // Media
  media?: VideoLike; // string URL or {mp4, webm, ogg}
  poster?: string;
  mediaType?: "video" | "image";
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  autoPlay?: boolean;

  // Overlay content (shown over sticky media on scroll)
  overlay?: {
    caption?: ReactNode;
    heading?: ReactNode;
    paragraphs?: ReactNode[];
    extra?: ReactNode; // slot for buttons, links, etc.
  };

  // Layout and animation tuning
  initialBoxSize?: number; // px, starting square size (default 360)
  targetSize?:
    | { widthVw: number; heightVh: number; borderRadius?: number }
    | "fullscreen";
  scrollHeightVh?: number; // total scroll height for sticky section (default 280)
  showHeroExitAnimation?: boolean; // headline roll-away (default true)
  sticky?: boolean; // keep media sticky (default true)
  overlayBlur?: number; // px blur for overlay content at start (default 10)
  overlayRevealDelay?: number; // seconds offset inside main timeline (default 0.35)
  eases?: Eases;

  // Smooth scrolling
  smoothScroll?: boolean; // initialize Lenis (default true)
  lenisOptions?: Record<string, unknown>;

  className?: string;
  style?: CSSProperties;
};

/* =========================
   Defaults
========================= */

const DEFAULTS = {
  initialBoxSize: 360,
  targetSize: "fullscreen" as const,
  scrollHeightVh: 280,
  overlayBlur: 10,
  overlayRevealDelay: 0.35,
  eases: {
    container: "expo.out",
    overlay: "expo.out",
    text: "power3.inOut",
  } as Eases,
};

/* =========================
   Helpers
========================= */

function isSourceObject(m?: VideoLike): m is Source {
  return !!m && typeof m !== "string";
}

/* =========================
   Component
========================= */

export const HeroScrollVideo: React.FC<HeroScrollVideoProps> = ({
  title = "Future Forms",
  subtitle = "Design in Motion",
  button,

  media,
  poster,
  mediaType = "video",
  muted = true,
  loop = true,
  playsInline = true,
  autoPlay = false,

  overlay = {
    caption: "PROJECT • 07",
    heading: "Clarity in Motion",
    paragraphs: [
      "Scroll to expand the frame and reveal the story.",
      "Built with GSAP ScrollTrigger and optional Lenis smooth scroll.",
    ],
    extra: null,
  },

  initialBoxSize = DEFAULTS.initialBoxSize,
  targetSize = DEFAULTS.targetSize,
  scrollHeightVh = DEFAULTS.scrollHeightVh,
  showHeroExitAnimation = true,
  sticky = true,
  overlayBlur = DEFAULTS.overlayBlur,
  overlayRevealDelay = DEFAULTS.overlayRevealDelay,
  eases = DEFAULTS.eases,

  smoothScroll = true,
  lenisOptions,

  className,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayCaptionRef = useRef<HTMLDivElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);

  const isClient = typeof window !== "undefined";

  // Inline CSS variables for tuning (non-theme)
  const cssVars: CSSProperties = useMemo(
    () => ({
      ["--initial-size" as any]: `${initialBoxSize}px`,
      ["--overlay-blur" as any]: `${overlayBlur}px`,
    }),
    [initialBoxSize, overlayBlur],
  );

  // Scroll + GSAP wiring
  useEffect(() => {
    if (!isClient) return;

    let gsap: any;
    let ScrollTrigger: any;
    let CustomEase: any;
    let LenisCtor: any;
    let lenis: any;

    let heroTl: any;
    let mainTl: any;
    let overlayDarkenEl: HTMLDivElement | null = null;

    let rafCb: ((t: number) => void) | null = null;

    let cancelled = false;

    (async () => {
      const gsapPkg = await import("gsap");
      gsap = gsapPkg.gsap || gsapPkg.default || gsapPkg;

      const ScrollTriggerPkg =
        (await import("gsap/ScrollTrigger").catch(
          () => import("gsap/dist/ScrollTrigger"),
        )) || {};
      ScrollTrigger =
        ScrollTriggerPkg.default ||
        (ScrollTriggerPkg as any).ScrollTrigger ||
        ScrollTriggerPkg;

      const CustomEasePkg =
        (await import("gsap/CustomEase").catch(
          () => import("gsap/dist/CustomEase"),
        )) || {};
      CustomEase =
        CustomEasePkg.default ||
        (CustomEasePkg as any).CustomEase ||
        CustomEasePkg;

      gsap.registerPlugin(ScrollTrigger, CustomEase);

      if (cancelled) return;

      if (smoothScroll) {
        // Leaf Parallax
        const leaf1 = rootRef.current?.querySelector(".leaf-1");
        const leaf2 = rootRef.current?.querySelector(".leaf-2");

        if (leaf1) {
          gsap.to(leaf1, {
            y: -200,
            x: 60,
            rotation: 15,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (leaf2) {
          gsap.to(leaf2, {
            y: -300,
            x: -60,
            rotation: -20,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        const try1 = await import("lenis").catch(() => null);
        const try2 = try1 || (await import("lenis").catch(() => null));
        LenisCtor = try2?.default || (try2 as any)?.Lenis;
        if (LenisCtor) {
          lenis = new LenisCtor({
            duration: 0.8,
            smoothWheel: true,
            gestureOrientation: "vertical",
            ...lenisOptions,
          });
          rafCb = (time: number) => lenis?.raf(time * 1000);
          gsap.ticker.add(rafCb);
          gsap.ticker.lagSmoothing(0);
          lenis?.on?.("scroll", ScrollTrigger.update);
        }
      }

      const containerEase = eases.container ?? "expo.out";
      const overlayEase = eases.overlay ?? "expo.out";
      const textEase = eases.text ?? "power3.inOut";

      const container = containerRef.current!;
      const overlayEl = overlayRef.current!;
      const overlayCaption = overlayCaptionRef.current!;
      const overlayContent = overlayContentRef.current!;
      const headline = headlineRef.current!;

      // Darkening overlay inside the media box
      if (container) {
        overlayDarkenEl = document.createElement("div");
        overlayDarkenEl.setAttribute("data-auto-darken", "true");
        overlayDarkenEl.style.position = "absolute";
        overlayDarkenEl.style.inset = "0";
        overlayDarkenEl.style.background = "rgba(0,0,0,0)";
        overlayDarkenEl.style.pointerEvents = "none";
        overlayDarkenEl.style.zIndex = "1";
        container.appendChild(overlayDarkenEl);
      }

      // Headline roll-away
      if (showHeroExitAnimation && headline) {
        heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: headline,
            start: "top 20%",
            end: "top+=420 top",
            scrub: 1.1,
          },
        });

        headline
          .querySelectorAll<HTMLElement>(".hsv-headline > *")
          .forEach((el, i) => {
            heroTl.to(
              el,
              {
                rotationX: 80,
                y: -50,
                scale: 0.86,
                opacity: 0,
                filter: "blur(4px)",
                transformOrigin: "center top",
                ease: textEase,
              },
              i * 0.08,
            );
          });
      }

      // Main sticky expansion timeline
      const triggerEl = rootRef.current?.querySelector(
        "[data-sticky-scroll]",
      ) as HTMLElement;

      if (!triggerEl || !container || !overlayEl) return;

      mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
        },
      });

      // Target size
      const target = (() => {
        if (targetSize === "fullscreen") {
          return { width: "92vw", height: "82vh", borderRadius: 0 };
        }
        return {
          width: `${targetSize.widthVw ?? 92}vw`,
          height: `${targetSize.heightVh ?? 92}vh`,
          borderRadius: targetSize.borderRadius ?? 0,
        };
      })();

      // Initial states
      gsap.set(container, {
        width: initialBoxSize,
        height: initialBoxSize,
        borderRadius: 20,
        filter: "none",
        clipPath: "inset(0 0 0 0)",
      });
      gsap.set(overlayEl, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(overlayContent, {
        filter: `blur(var(--overlay-blur))`,
        scale: 1.05,
      });
      gsap.set([overlayContent, overlayCaption], { y: 30 });

      // Animate the container to expand
      mainTl
        .to(
          container,
          {
            width: target.width,
            height: target.height,
            borderRadius: target.borderRadius,
            ease: containerEase,
          },
          0,
        )
        // Darken as it expands
        .to(
          overlayDarkenEl,
          {
            backgroundColor: "rgba(0,0,0,0.4)",
            ease: "power2.out",
          },
          0,
        )
        // Reveal overlay panel
        .to(
          overlayEl,
          {
            clipPath: "inset(0% 0 0 0)",
            backdropFilter: `blur(${overlayBlur}px)`,
            ease: overlayEase,
          },
          overlayRevealDelay,
        )
        // Content slides in and unblurs
        .to(
          overlayCaption,
          { y: 0, ease: overlayEase },
          overlayRevealDelay + 0.05,
        )
        .to(
          overlayContent,
          {
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            ease: overlayEase,
          },
          overlayRevealDelay + 0.05,
        );

      // Try to play video
      const videoEl = container.querySelector(
        "video",
      ) as HTMLVideoElement | null;
      if (videoEl) {
        const tryPlay = () => videoEl.play().catch(() => {});
        tryPlay();
        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top top",
          onEnter: tryPlay,
        });
      }
    })();

    return () => {
      cancelled = true;
      try {
        (heroTl as any)?.kill?.();
        (mainTl as any)?.kill?.();
      } catch {}
      try {
        if ((ScrollTrigger as any)?.getAll && rootRef.current) {
          (ScrollTrigger as any)
            .getAll()
            .forEach(
              (t: any) => rootRef.current!.contains(t.trigger) && t.kill(true),
            );
        }
      } catch {}
      try {
        if (overlayDarkenEl?.parentElement) {
          overlayDarkenEl.parentElement.removeChild(overlayDarkenEl);
        }
      } catch {}
      try {
        if (rafCb && (gsap as any)?.ticker) {
          (gsap as any).ticker.remove(rafCb);
          (gsap as any).ticker.lagSmoothing(1000, 16);
        }
      } catch {}
      try {
        (lenis as any)?.off?.("scroll", (ScrollTrigger as any)?.update);
        (lenis as any)?.destroy?.();
      } catch {}
    };
  }, [
    isClient,
    initialBoxSize,
    targetSize,
    scrollHeightVh,
    overlayBlur,
    overlayRevealDelay,
    eases.container,
    eases.overlay,
    eases.text,
    showHeroExitAnimation,
    sticky,
    smoothScroll,
    JSON.stringify(lenisOptions),
  ]);

  // Media rendering
  const renderMedia = () => {
    if (mediaType === "image") {
      const src = typeof media === "string" ? media : media?.mp4 || "";
      return (
        <img
          src={src}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    }
    // video
    const sources: React.ReactNode[] = [];
    if (typeof media === "string") {
      sources.push(<source key="mp4" src={media} type="video/mp4" />);
    } else if (isSourceObject(media)) {
      if (media.webm)
        sources.push(<source key="webm" src={media.webm} type="video/webm" />);
      if (media.mp4)
        sources.push(<source key="mp4" src={media.mp4} type="video/mp4" />);
      if (media.ogg)
        sources.push(<source key="ogg" src={media.ogg} type="video/ogg" />);
    }

    return (
      <video
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        autoPlay={autoPlay || muted}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        {sources}
      </video>
    );
  };

  return (
    <div
      ref={rootRef}
      className={["hsv-root", className].filter(Boolean).join(" ")}
      style={{ ...cssVars, ...style }}
    >
      {/* Headline/hero area */}
      <div className="hsv-container " ref={headlineRef}>
        {/* Decorative Leaves */}
        <Image
          src="/images/leaf1.webp"
          alt="leaf"
          width={300}
          height={100}
          className="absolute top-10 rotate-90 -left-5 md:w-90 w-40 opacity-80 pointer-events-none leaf-1"
        />

        <Image
          src="/images/leaf2.webp"
          alt="leaf"
          width={300}
          height={100}
          className="absolute bottom-0 rotate-180 -right-5 md:w-80 w-40 opacity-70 pointer-events-none leaf-2"
        />

        <div className="hsv-headline mt-20">
          <h1 className="hsv-title [font-family:var(--font-heading)]">{title}</h1>
          {subtitle ? <h2 className="hsv-subtitle">{subtitle}</h2> : null}
          {button ? (
            <div className="mt-6">
              <Link href="/order">
              <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition cursor-pointer">
                {button}
              </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {/* Sticky scroll section */}
      <div
        className="hsv-scroll"
        data-sticky-scroll
        style={{ height: `${Math.max(150, scrollHeightVh)}vh` }}
      >
        <div className={`hsv-sticky ${sticky ? "is-sticky" : ""}`}>
          <div className="hsv-media" ref={containerRef}>
            {renderMedia()}

            {/* overlay that reveals */}
            <div className="hsv-overlay" ref={overlayRef}>
              <div className="mt-10 flex flex-col">
                {overlay?.caption ? (
                  <div className="hsv-caption [font-family:var(--font-heading)]" ref={overlayCaptionRef}>
                    {overlay.caption}
                  </div>
                ) : null}
                <div className="hsv-overlay-content" ref={overlayContentRef}>
                  {overlay?.heading ? <h3>{overlay.heading}</h3> : null}
                  {overlay?.paragraphs?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {overlay?.extra}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles (scoped) */}
      <style>{`
       .hsv-root {

  --bg: 
    #f2ede2;

  --text: hsl(var(--foreground));

  --muted:hsl(var(--muted-foreground));
  --muted-bg: rgba(15,17,21,0.06);
  --muted-border: rgba(15,17,21,0.12);

  --overlay-bg: rgba(10,10,14,0.35);
  --overlay-text: #ffffff;

  --accent: hsl(var(--primary));
  --accent-2: hsl(var(--warm-green));

  --shadow: 0 10px 30px rgba(0,0,0,0.08);

  background: var(--bg);
  color: var(--text);

  overflow-x: clip;
}


        .hsv-container {
          height: 70vh;
          display: grid;
          place-items: center;
          padding: clamp(16px, 3vw, 40px);
          perspective: 900px;
          position: relative;
  overflow: hidden;
        }

        .hsv-headline { 
          text-align: center;
          transform-style: preserve-3d;
          max-width: min(100%, 1100px);
        }
        .hsv-headline > * {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transform-origin: center top;
        }

        .hsv-title {
          margin: 0 0 .6rem 0;
          font-size: clamp(40px, 8vw, 70px);
          line-height: 0.98;
          font-weight: 900;
          letter-spacing: -0.02em;
          text-wrap: balance;
          background: linear-gradient(90deg, var(--text) 0%, var(--text) 50%, var(--accent) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 2px 0 rgba(0,0,0,0.05));
        }
        .hsv-subtitle {
          margin: 0 0 1.25rem 0;
          font-size: clamp(18px, 3.5vw, 22px);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }     

        .hsv-scroll { position: relative; }
        .hsv-sticky.is-sticky {
          position: sticky;
          top:0;
          height: 100vh;
          display: grid;
          place-items: center;
        }

        .hsv-media {
          position: relative;
          width: var(--initial-size);
          height: var(--initial-size);
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          display: grid;
          place-items: center;
          transition: border-radius 0.3s ease;
          box-shadow: var(--shadow);
        }

        .hsv-overlay {
          position: absolute;
          inset: 0;
          background: var(--overlay-bg);
          color: var(--overlay-text);
          display: flex;
         
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(16px, 4vw, 40px);
          clip-path: inset(100% 0 0 0);
          backdrop-filter: blur(var(--overlay-blur));
          z-index: 2;
        }
      
        .hsv-caption {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          position: absolute;
          top: clamp(8px, 3vw, 80px);
          left: 0;
          width: 100%;
          text-align: center;
          opacity: 0.95;
        }

        .hsv-overlay-content {
          margin-top: 1.2rem;
          max-width: 68ch;
          display: grid;
          gap: 0.9rem;
        }
        .hsv-overlay-content h3 {
          font-size: clamp(26px, 5vw, 50px);
          line-height: 1.02;
          margin: 0;
          font-weight: 900;
          letter-spacing: -0.01em;
          background: linear-gradient(90deg, #fff 0%, #fff 40%, var(--accent-2) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-wrap: balance;
          position: relative;
        }
        .hsv-overlay-content h3::after {
          content: "";
          display: block;
          width: 72px;
          height: 3px;
          border-radius: 999px;
          margin: 10px auto 0 auto;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          opacity: 0.9;
        }
        .hsv-overlay-content p {
          font-size: clamp(15px, 2.1vw, 19px);
          line-height: 1.75;
          margin: 0;
          color: #f3f4f6; /* better contrast over video */
          opacity: 0.95;
        }

        @media (max-width: 900px) {
          .hsv-overlay-content { max-width: 40ch; }
        }
      `}</style>
    </div>
  );
};

export default HeroScrollVideo;
