import { useEffect, useRef, useState, type CSSProperties } from "react";
import { services } from "../config/services";
import { getCarouselOffset } from "../utils/carousel";

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const wheelLock = useRef(false);

  const changeSlide = (direction: number) => {
    setActiveIndex((current) => {
      const nextIndex = current + direction;

      if (nextIndex < 0) {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
        return current;
      }

      if (nextIndex >= services.length) {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
        return current;
      }

      return nextIndex;
    });
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (wheelLock.current || Math.abs(event.deltaY) < 10) return;
    wheelLock.current = true;
    changeSlide(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 650);
  };

  useEffect(() => {
    if (!isHovered) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current === services.length - 1 ? 0 : current + 1,
      );
    }, 2400);

    return () => window.clearInterval(timer);
  }, [isHovered]);

  return (
    <main
      className="service-carousel"
      id="services"
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <header className="service-carousel__header">
        <p className="service-carousel__eyebrow">RAW FRAME FILMS / PORTFOLIO</p>
        <p className="service-carousel__hint">Selected work</p>
      </header>

      <section
        className="service-carousel__stage"
        aria-label="Videography services"
      >
        {services.map((service, index) => {
          const offset = getCarouselOffset(index, activeIndex, services.length);
          const isActive = offset === 0;
          const style = { "--service-accent": service.accent } as CSSProperties;

          return (
            <article
              className={`service-card service-card--offset-${offset} ${isActive ? "service-card--active" : ""}`}
              key={service.title}
              data-service={service.number}
              style={{ ...style, "--card-offset": offset } as CSSProperties}
              aria-hidden={!isActive}
              onClick={() => {
                if (offset !== 0) changeSlide(offset < 0 ? -1 : 1);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  if (offset !== 0) changeSlide(offset < 0 ? -1 : 1);
                }
              }}
              role={isActive ? undefined : "button"}
              tabIndex={isActive ? undefined : 0}
            >
              <div className="service-card__media">
                <video
                  src={service.video}
                  poster={service.poster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  aria-hidden="true"
                />
                <div className="service-card__wash" />
                <span className="service-card__number">{service.number}</span>
              </div>
              <div className="service-card__copy">
                <p className="service-card__label">
                  {isActive ? "Selected service" : "Raw Frame Films"}
                </p>
                <h1>{service.title}</h1>
                <p>{service.description}</p>
                {isActive && (
                  <button type="button" className="service-card__link">
                    Learn more <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <footer className="service-carousel__footer" aria-hidden="true">
        <span>Scroll to explore</span>
        <span>
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(services.length).padStart(2, "0")}
        </span>
      </footer>
    </main>
  );
}
