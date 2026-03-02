"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "grid", label: "Grid" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Disconnect previous observers
    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];

    sections.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observersRef.current.push(observer);
    });

    return () => {
      observersRef.current.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top nav bar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem 3rem",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      >
        {/* Site name */}
        <span
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "1.1rem",
            letterSpacing: "0.12em",
            color: "#fff",
          }}
        >
          6v1d
        </span>

        {/* Anchor links */}
        <ul
          style={{
            display: "flex",
            gap: "2.5rem",
            listStyle: "none",
          }}
        >
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  opacity: 0.6,
                  transition: "opacity 0.3s ease",
                  fontFamily: "var(--font-barlow)",
                  padding: 0,
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.opacity = "1")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.opacity = "0.6")
                }
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right-edge section dots */}
      <div
        className="nav-dots-panel"
        style={{
          position: "fixed",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            aria-label={`Go to ${section.label}`}
            style={{ cursor: "pointer", background: "none", border: "none", padding: "4px" }}
          >
            <span className={`nav-dot${activeIndex === i ? " active" : ""}`} style={{ display: "block" }} />
          </button>
        ))}
      </div>
    </>
  );
}
