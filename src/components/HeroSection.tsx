import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroCameraBackground from "./HeroCameraBackground";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: "55", label: "Projects Delivered" },
  { value: "3", label: "Years Experience" },
  { value: "2", label: "Awards Won" },
  { value: "27", label: "Happy Clients" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8],
    [1, 0.6, 0],
  );
  const textBlur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 4, 12]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const statsOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8],
    [1, 0.5, 0],
  );

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" id="home" ref={sectionRef}>
      <HeroCameraBackground />

      <header
        className="hero-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-container">
          <div className="nav-brand" aria-label="Raw Frame Films Home">
            <img
              src="/logorawframes.png"
              alt="Raw Frames Film Production and Aperture Works"
              className="nav-logo-image"
            />
          </div>

          <nav className="nav-links" aria-label="Primary">
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    className="nav-link"
                    onClick={() => scrollTo(link.href)}
                    aria-label={link.label}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="nav-cta"
            onClick={() => scrollTo("#contact")}
            aria-label="Get in touch"
          >
            Start a Project
          </button>
        </div>
      </header>

      <main className="hero-content" aria-labelledby="hero-title">
        <motion.div
          className="hero-text-container"
          style={{
            opacity: textOpacity,
            y: textY,
            filter: useTransform(textBlur, (v) => `blur(${v}px)`),
          }}
        >
          <motion.h1
            id="hero-title"
            className="hero-headline"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="hero-headline-line">We craft</span>
            <span className="hero-headline-line hero-headline-accent">
              cinematic stories
            </span>
            <span className="hero-headline-line">that move</span>
          </motion.h1>

          <motion.p
            className="hero-subheadline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            A full-service production house blending narrative depth with visual
            precision. From concept to final frame.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollTo("#services")}
              aria-label="View our services"
            >
              Explore Services
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 10h10M10 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => scrollTo("#contact")}
              aria-label="Contact us"
            >
              Start a Project
            </button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{ opacity: statsOpacity }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4v16M8 12l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
