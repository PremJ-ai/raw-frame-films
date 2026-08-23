import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImageOne from "../assets/hero/rawframe-1.jpg";
import heroImageTwo from "../assets/hero/rawframe-2.jpg";
import heroImageThree from "../assets/hero/rawframe-3.jpg";

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

export default function HeroSection() {
  const cameraRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll({ target: sectionRef });
  const cameraRotateX = useTransform(
    scrollY,
    [0, window.innerHeight],
    ["-15deg", "15deg"],
  );
  const cameraRotateY = useTransform(
    scrollY,
    [0, window.innerHeight],
    ["10deg", "-10deg"],
  );
  const cameraTranslateY = useTransform(
    scrollY,
    [0, window.innerHeight],
    ["0%", "20%"],
  );
  const cameraScale = useTransform(scrollY, [0, window.innerHeight], [1, 1.05]);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="hero-section" id="home">
      <div className="hero-background">
        {/* Placeholder for real production photography. */}
        <img
          src={heroImageOne}
          alt=""
          className="hero-background-image hero-background-image--one"
        />
        {/* Placeholder for real production photography. */}
        <img
          src={heroImageTwo}
          alt=""
          className="hero-background-image hero-background-image--two"
        />
        {/* Placeholder for real production photography. */}
        <img
          src={heroImageThree}
          alt=""
          className="hero-background-image hero-background-image--three"
        />
        <div className="hero-gradient" />
        <div className="hero-grid" />
        <div className="hero-particles" aria-hidden="true" />
      </div>

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
        <div className="hero-camera-stage">
          <motion.div
            ref={cameraRef}
            className="hero-camera"
            style={{
              rotateX: cameraRotateX,
              rotateY: cameraRotateY,
              y: cameraTranslateY,
              scale: cameraScale,
            }}
            aria-hidden="true"
          >
            <div className="camera-body">
              <div className="camera-lens">
                <div className="lens-glass" />
                <div className="lens-ring" />
                <div className="lens-reflection" />
              </div>
              <div className="camera-grip" />
              <div className="camera-viewfinder">
                <div className="viewfinder-frame" />
                <div className="viewfinder-overlay" />
              </div>
              <div className="camera-top">
                <div className="hot-shoe" />
                <div className="mode-dial" />
                <div
                  className="record-button"
                  aria-label="Recording indicator"
                />
              </div>
              <div className="camera-side">
                <div className="focus-ring" />
                <div className="zoom-ring" />
              </div>
            </div>

            <motion.div
              className="camera-floating-elements"
              animate={{
                y: [0, -20, 0],
                rotateZ: [-5, 5, -5],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <div
                className="float-particle"
                style={{ top: "10%", left: "-30%", animationDelay: "0s" }}
              />
              <div
                className="float-particle"
                style={{ top: "30%", right: "-25%", animationDelay: "1.5s" }}
              />
              <div
                className="float-particle"
                style={{ bottom: "20%", left: "-20%", animationDelay: "3s" }}
              />
              <div
                className="float-particle"
                style={{ bottom: "10%", right: "-30%", animationDelay: "4.5s" }}
              />
            </motion.div>

            <motion.div
              className="camera-focus-lines"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              {[0, 90, 180, 270].map((angle) => (
                <div
                  key={angle}
                  className="focus-line"
                  style={{ transform: `rotate(${angle}deg)` }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-text">
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
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            A full-service production house blending narrative depth with visual
            precision. From concept to final frame.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
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
            transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="stat">
              <span className="stat-value" data-count="150">
                0
              </span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat">
              <span className="stat-value" data-count="12">
                0
              </span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-value" data-count="47">
                0
              </span>
              <span className="stat-label">Awards Won</span>
            </div>
            <div className="stat">
              <span className="stat-value" data-count="300">
                0
              </span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </motion.div>
        </div>

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
      </main>
    </section>
  );
}
