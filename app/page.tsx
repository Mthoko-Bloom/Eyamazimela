"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  ArrowUpRight,
  UtensilsCrossed,
  Flower2,
  Cake,
  Camera,
  Sparkles,
  MapPin,
  Mail,
  Clock,
  Facebook,
  Instagram,
  GraduationCap,
  Landmark,
  Award,
  CheckCircle2,
  Calendar,
  Users,
  Send,
  PartyPopper,
  Quote,
  ChevronRight,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Business constants                                                        */
/* -------------------------------------------------------------------------- */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const BUSINESS = {
  name: "Eyamazimela",
  legalName: "Eyamazimela Pty Ltd",
  tagline: "We strive in making your special day perfect.",
  taglineAlt: "We strike it right the first time.",
  phoneDisplay: "071 056 9739",
  phoneHref: "tel:+27710569739",
  whatsappHref: "https://wa.me/27710569739",
  email: "hello@eyamazimela.co.za",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  addressLine1: "E 50114 Embuthweni Main Road",
  addressLine2: "Unit 4, Mpumalanga Township",
  addressLine3: "Hammarsdale, KwaZulu-Natal, South Africa",
};

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
  points: string[];
};

const SERVICES: Service[] = [
  {
    icon: UtensilsCrossed,
    title: "Premium Event Catering",
    blurb:
      "Menus designed around your guests and your theme, plated and served to a standard usually reserved for state functions.",
    points: ["Bespoke menu design", "Buffet & plated service", "Full serving staff"],
  },
  {
    icon: Flower2,
    title: "Elegant Venue Décor",
    blurb:
      "From intimate gatherings to grand pavilions, we style the room so it feels considered in every corner.",
    points: ["Theme & colour styling", "Draping & florals", "Table & stage design"],
  },
  {
    icon: Cake,
    title: "Custom Baking & Cakes",
    blurb:
      "Celebration cakes and dessert tables baked to order, matched to the look and story of your day.",
    points: ["Tiered celebration cakes", "Dessert tables", "Themed custom bakes"],
  },
  {
    icon: Camera,
    title: "Professional Media",
    blurb:
      "Crisp photography and coverage that captures the day exactly as it felt, ready to share and to keep.",
    points: ["Event photography", "Highlight coverage", "Edited galleries"],
  },
];

type Category = "decor" | "catering" | "cakes" | "photography";

type PortfolioItem = {
  category: Category;
  src: string;
  title: string;
  description: string;
};

// Real photographs of Eyamazimela events, supplied by the founder.
const PORTFOLIO: PortfolioItem[] = [
  {
    category: "decor",
    src: `${BASE}/images/decor-banquet.jpg`,
    title: "Gold & Timber Banquet",
    description:
      "Cross-back gold chairs and raw timber tables styled for a traditional family celebration.",
  },
  {
    category: "decor",
    src: `${BASE}/images/decor-tables.jpg`,
    title: "Heritage Table Story",
    description:
      "Shweshwe runners, potjie centrepieces and amber napkins — proudly South African styling by Eyamazimela.",
  },
  {
    category: "catering",
    src: `${BASE}/images/catering-drumsticks.jpg`,
    title: "Sticky Glazed Drumsticks",
    description:
      "Slow-glazed chicken drumsticks, finished with fresh herbs and served straight to the buffet.",
  },
  {
    category: "catering",
    src: `${BASE}/images/catering-pasta.jpg`,
    title: "Creamy Chicken & Mushroom Pasta",
    description:
      "Rich, comforting penne prepared in bulk without losing the home-cooked touch.",
  },
  {
    category: "catering",
    src: `${BASE}/images/catering-desserts.jpg`,
    title: "Strawberry Dessert Cups",
    description:
      "Individual layered dessert cups, portioned and presented for effortless service.",
  },
  {
    category: "cakes",
    src: `${BASE}/images/cakes-baby.jpg`,
    title: "Welcome-Baby Shower Cake",
    description:
      "A powder-blue baby shower centrepiece with hand-placed pearls, blocks and bows.",
  },
  {
    category: "cakes",
    src: `${BASE}/images/cakes-soccer.jpg`,
    title: "Football-Fan Birthday Cake",
    description:
      "A custom club-themed birthday cake — any passion, turned into a showstopper.",
  },
  {
    category: "photography",
    src: `${BASE}/images/photography-event.jpg`,
    title: "Captured by Our Lens",
    description:
      "Professional coverage of the events we style — crisp, warm and ready to share.",
  },
];

const FILTERS: { label: string; value: "all" | Category }[] = [
  { label: "All", value: "all" },
  { label: "Décor", value: "decor" },
  { label: "Catering", value: "catering" },
  { label: "Cakes", value: "cakes" },
  { label: "Photography", value: "photography" },
];

const CATEGORY_ICON: Record<Category, LucideIcon> = {
  decor: Flower2,
  catering: UtensilsCrossed,
  cakes: Cake,
  photography: Camera,
};

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Founder", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

const FOUNDER_CREDENTIALS = [
  {
    icon: GraduationCap,
    title: "Public Relations & Communication Science",
    text: "A formal academic grounding in how messages, brands and moments are built and delivered.",
  },
  {
    icon: Landmark,
    title: "Former Government Communications Officer",
    text: "Communications officer for the South African Department of Economic Development.",
  },
  {
    icon: Award,
    title: "State-Level Event Standards",
    text: "Organised Izimbizo and corporate exhibition pavilions — now brought to private celebrations.",
  },
];

const STATS = [
  { value: "10+", label: "Years in communications & events" },
  { value: "4", label: "Services under one roof" },
  { value: "100%", label: "Focus on your special day" },
];

const SERVICE_OPTIONS = [
  "Event Catering",
  "Venue Décor",
  "Custom Cake / Baking",
  "Media & Photography",
];

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
}) {
  const titleColor = tone === "light" ? "text-cream" : "text-forest-950";
  const introColor = tone === "light" ? "text-cream/70" : "text-forest-800/70";
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <span className="eyebrow">
        <span className="h-px w-6 bg-gold-500" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        className={`max-w-2xl text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`max-w-xl text-base leading-relaxed ${introColor}`}>{intro}</p>
      ) : null}
    </div>
  );
}

function ImageWithFallback({
  src,
  alt,
  category,
  className = "",
}: {
  src: string;
  alt: string;
  category: Category;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const Icon = CATEGORY_ICON[category];

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Icon className="h-10 w-10 text-gold-500" />
        <span className="text-xs font-semibold uppercase tracking-widest2 text-gold-300">
          {BUSINESS.name}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gold-500/15 bg-forest-950/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Primary"
      >
        <a href="#home" className="flex items-center gap-3" aria-label={`${BUSINESS.legalName} home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/50 text-gold-400">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold text-cream">
              {BUSINESS.name}
            </span>
            <span className="text-[0.6rem] uppercase tracking-widest2 text-gold-400">
              Pty Ltd
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream/80 transition-colors hover:text-gold-300"
            >
              {link.label}
            </a>
          ))}
          <a href="#booking" className="btn-primary py-3">
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/40 text-cream lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-forest-950/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          id="mobile-drawer"
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 bg-forest-900 px-6 pb-8 pt-24 shadow-luxe transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-cream/10 py-4 text-lg font-medium text-cream/90 transition-colors hover:text-gold-300"
            >
              {link.label}
              <ChevronRight className="h-5 w-5 text-gold-500" />
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="btn-primary mt-6 w-full"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href={BUSINESS.phoneHref} className="btn-ghost mt-3 w-full">
            <Phone className="h-4 w-4" />
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-forest-950 pb-20 pt-32 sm:pt-40"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 78% 12%, rgba(201,162,75,0.22), transparent 60%), radial-gradient(50% 50% at 8% 90%, rgba(44,114,86,0.35), transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,245,239,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(247,245,239,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-up">
          <span className="eyebrow text-gold-400">
            <span className="h-px w-6 bg-gold-500" aria-hidden="true" />
            Hammarsdale &middot; KwaZulu-Natal
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-cream sm:text-5xl md:text-6xl lg:text-7xl">
            We strive in making your{" "}
            <span className="gold-gradient-text italic">special day</span> perfect.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
            {BUSINESS.legalName} brings government-grade event execution to private
            celebrations — premium catering, elegant décor, custom cakes and
            professional media, delivered with the precision of a state occasion and
            the warmth of home.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#booking" className="btn-primary">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={BUSINESS.phoneHref} className="btn-ghost">
              <Phone className="h-4 w-4" />
              Call Now &middot; {BUSINESS.phoneDisplay}
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-cream/10 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="font-display text-3xl font-semibold text-gold-400">
                  {stat.value}
                </dt>
                <dd className="text-xs leading-snug text-cream/60">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Image collage */}
        <div className="relative hidden lg:block">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-gold-500/20 shadow-luxe">
            <ImageWithFallback
              src={`${BASE}/images/decor-marquee.jpg`}
              alt="Draped marquee interior with red-carpet aisle, styled by Eyamazimela"
              category="decor"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -left-6 aspect-square w-44 overflow-hidden rounded-3xl border border-gold-500/25 shadow-luxe">
            <ImageWithFallback
              src={`${BASE}/images/cakes-baby.jpg`}
              alt="Custom baby shower cake by Eyamazimela"
              category="cakes"
            />
          </div>
          <div className="absolute -right-4 top-10 flex items-center gap-3 rounded-2xl border border-gold-500/25 bg-forest-900/80 px-4 py-3 backdrop-blur-md">
            <PartyPopper className="h-5 w-5 text-gold-400" />
            <span className="text-sm font-medium text-cream/90">
              Catering &middot; Décor &middot; Cakes &middot; Media
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

function Services() {
  return (
    <section id="services" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Four pillars, one seamless{" "}
                <span className="gold-gradient-text">celebration</span>
              </>
            }
            intro="Everything your event needs, coordinated under one roof — so the day feels effortless from the first guest to the last dance."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 90}>
                <article className="group flex h-full flex-col rounded-2xl border border-forest-800/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-luxe">
                  <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-forest-950 text-gold-400 transition-colors duration-300 group-hover:bg-forest-900">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-xl font-semibold text-forest-950">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-800/70">
                    {service.blurb}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-forest-800/10 pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-forest-800/80"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Portfolio (filterable)                                                    */
/* -------------------------------------------------------------------------- */

function Portfolio() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const items =
    filter === "all" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="bg-forest-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our work"
            tone="light"
            title={
              <>
                A portfolio built on <span className="gold-gradient-text">detail</span>
              </>
            }
            intro="Filter through a taste of the celebrations we style, cater, bake and capture across KwaZulu-Natal."
          />
        </Reveal>

        <Reveal>
          <div
            className="mt-12 flex flex-wrap justify-center gap-3"
            role="tablist"
            aria-label="Filter portfolio by category"
          >
            {FILTERS.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? "bg-gold-500 text-forest-950 shadow-luxe"
                      : "border border-cream/15 text-cream/70 hover:border-gold-500/50 hover:text-gold-300"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={`${item.title}-${i}`} delay={(i % 3) * 80}>
              <article className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-forest-900">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <ImageWithFallback
                    src={item.src}
                    alt={item.title}
                    category={item.category}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-forest-950">
                    {FILTERS.find((f) => f.value === item.category)?.label}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-h-0 overflow-hidden text-sm leading-relaxed text-cream/75 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-cream/50">
          Every photo above is a real Eyamazimela event — styled, catered, baked and
          captured by our team.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Founder                                                                   */
/* -------------------------------------------------------------------------- */

function Founder() {
  return (
    <section id="founder" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <SectionHeading
            eyebrow="Meet the founder"
            align="left"
            title={
              <>
                Pearl Nonhlanhla <span className="gold-gradient-text">Mnguni</span>
              </>
            }
          />
          <p className="mt-6 text-base leading-relaxed text-forest-800/80">
            Eyamazimela is led by Pearl Nonhlanhla Mnguni, whose career was built in
            the exacting world of public sector communications. As a former
            communications officer for the South African Department of Economic
            Development, she coordinated Izimbizo and corporate exhibition pavilions
            where nothing could be left to chance.
          </p>
          <p className="mt-4 text-base leading-relaxed text-forest-800/80">
            She now brings that same standard — the planning, the polish, the sense
            of occasion — directly to your celebration. With Pearl, your event is in
            the hands of a professional who has delivered under real pressure, on real
            stages, for real audiences.
          </p>

          <div className="mt-9 space-y-4">
            {FOUNDER_CREDENTIALS.map((cred) => {
              const Icon = cred.icon;
              return (
                <div key={cred.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-950 text-gold-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-forest-950">
                      {cred.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-forest-800/70">
                      {cred.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <a href="#booking" className="btn-outline-dark mt-9">
            Plan your event with Pearl
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-forest-800/10 shadow-luxe">
              <ImageWithFallback
                src={`${BASE}/images/pearl.jpg`}
                alt="Portrait of founder Pearl Nonhlanhla Mnguni"
                category="photography"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 flex w-[86%] -translate-x-1/2 items-center gap-3 rounded-2xl border border-gold-500/30 bg-white px-5 py-4 shadow-luxe">
              <Quote className="h-8 w-8 shrink-0 text-gold-500" />
              <p className="font-display text-sm italic leading-snug text-forest-900">
                &ldquo;{BUSINESS.taglineAlt}&rdquo;
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Booking form + success modal                                              */
/* -------------------------------------------------------------------------- */

const GUEST_OPTIONS = ["Up to 50", "50 – 100", "100 – 250", "250 – 500", "500+"];

function BookingForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setSelectedServices([]);
    setName("");
    setPhone("");
    setEmail("");
    setEventDate("");
    setGuests("");
    setDetails("");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSubmitted(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="booking" className="relative overflow-hidden bg-forest-900 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(45% 45% at 85% 15%, rgba(201,162,75,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Request a quote"
            tone="light"
            align="left"
            title={
              <>
                Let&rsquo;s plan something{" "}
                <span className="gold-gradient-text">unforgettable</span>
              </>
            }
            intro="Tell us about your event and we'll come back with a tailored estimate. No obligation — just a conversation about your special day."
          />

          <div className="mt-10 space-y-5">
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center gap-4 rounded-2xl border border-cream/10 bg-forest-950/40 p-5 transition hover:border-gold-500/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-forest-950">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest2 text-cream/50">
                  Call us directly
                </span>
                <span className="block text-lg font-semibold text-cream">
                  {BUSINESS.phoneDisplay}
                </span>
              </span>
            </a>
            <a
              href={BUSINESS.whatsappHref}
              className="flex items-center gap-4 rounded-2xl border border-cream/10 bg-forest-950/40 p-5 transition hover:border-gold-500/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-forest-950">
                <Send className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest2 text-cream/50">
                  Prefer to chat?
                </span>
                <span className="block text-lg font-semibold text-cream">
                  Message us on WhatsApp
                </span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-cream/10 bg-cream p-6 shadow-luxe sm:p-8"
            noValidate
          >
            <fieldset className="mb-6">
              <legend className="field-label mb-3">
                Which services are you interested in?
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((service) => {
                  const active = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      aria-pressed={active}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                        active
                          ? "border-gold-500 bg-gold-500/15 text-forest-900"
                          : "border-forest-800/15 bg-white text-forest-800/70 hover:border-gold-500/50"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          active
                            ? "border-gold-500 bg-gold-500 text-forest-950"
                            : "border-forest-800/30"
                        }`}
                      >
                        {active ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                      </span>
                      {service}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="field-label">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="phone" className="field-label">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="071 234 5678"
                  className="field-input"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="field-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="field-input"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="event-date" className="field-label">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-gold-500" />
                    Tentative event date
                  </span>
                </label>
                <input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="guests" className="field-label">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gold-500" />
                    Estimated guests
                  </span>
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="field-input"
                >
                  <option value="">Select a range</option>
                  {GUEST_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="details" className="field-label">
                Tell us about your event
              </label>
              <textarea
                id="details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Type of celebration, venue, theme, anything else…"
                className="field-input resize-none"
              />
            </div>

            <button type="submit" className="btn-primary mt-7 w-full">
              Submit Inquiry
              <Send className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-xs text-forest-800/50">
              This is a prototype form — submissions are simulated, not stored.
            </p>
          </form>
        </Reveal>
      </div>

      {/* Success modal */}
      {submitted ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div
            onClick={() => setSubmitted(false)}
            className="absolute inset-0 bg-forest-950/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md animate-fade-up rounded-3xl border border-gold-500/30 bg-cream p-8 text-center shadow-luxe">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-forest-800/50 transition hover:bg-forest-800/5 hover:text-forest-900"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-950 text-gold-400">
              <PartyPopper className="h-8 w-8" />
            </span>
            <h3 id="success-title" className="mt-6 text-2xl font-semibold text-forest-950">
              Inquiry Simulated Successfully!
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-forest-800/75">
              Once linked to your Supabase table, this will capture live requests.
            </p>
            <button type="button" onClick={resetForm} className="btn-primary mt-7 w-full">
              Done
              <CheckCircle2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact + Footer                                                          */
/* -------------------------------------------------------------------------- */

function ContactFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-forest-950 pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-cream/10 pb-16 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/50 text-gold-400">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-cream">
                  {BUSINESS.name}
                </span>
                <span className="text-[0.6rem] uppercase tracking-widest2 text-gold-400">
                  Pty Ltd
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
              {BUSINESS.tagline} Premium catering, décor, custom cakes and media for
              celebrations across KwaZulu-Natal.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eyamazimela on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition hover:border-gold-500/60 hover:text-gold-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eyamazimela on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition hover:border-gold-500/60 hover:text-gold-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-gold-400">
              Visit / Operate
            </h3>
            <address className="mt-5 flex gap-3 not-italic text-sm leading-relaxed text-cream/70">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <span>
                {BUSINESS.addressLine1}
                <br />
                {BUSINESS.addressLine2}
                <br />
                {BUSINESS.addressLine3}
              </span>
            </address>
            <div className="mt-5 flex items-start gap-3 text-sm text-cream/70">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <span>
                Mon – Sat, by appointment
                <br />
                Events on any day of the week
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-gold-400">
              Get in touch
            </h3>
            <div className="mt-5 space-y-4">
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-3 text-sm text-cream/80 transition hover:text-gold-300"
              >
                <Phone className="h-5 w-5 text-gold-500" />
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-3 text-sm text-cream/80 transition hover:text-gold-300"
              >
                <Mail className="h-5 w-5 text-gold-500" />
                {BUSINESS.email}
              </a>
              <a
                href="#booking"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition hover:text-gold-200"
              >
                Request a quote
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-cream/50">
            &copy; {year} {BUSINESS.legalName}. All rights reserved.
          </p>
          <p className="text-xs italic text-cream/40">
            &ldquo;{BUSINESS.taglineAlt}&rdquo; &middot; {BUSINESS.addressLine2}, KZN
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Founder />
      <BookingForm />
      <ContactFooter />
    </main>
  );
}
