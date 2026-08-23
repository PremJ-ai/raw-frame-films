import { useRef, useState, type CSSProperties } from "react";
import { services } from "../config/services";
import { getCarouselOffset } from "../utils/carousel";

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const wheelLock = useRef(false);

  const changeSlide = (direction: number) => {
    setActiveIndex(
      (current) => (current + direction + services.length) % services.length,
    );
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (wheelLock.current || Math.abs(event.deltaY) < 10) return;
    wheelLock.current = true;
    changeSlide(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 650);
  };

  return (
    <main className="service-carousel" id="services" onWheel={handleWheel}>
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
