"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const children = sectionRef.current?.querySelectorAll("[data-anim]") ?? [];

      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      className="contact-section"
      ref={sectionRef}
      style={{
        padding: "10rem 3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <span
          data-anim
          className="section-label"
          style={{ color: "#000", opacity: 0, display: "block", marginBottom: "3rem" }}
        >
          04 — Contact
        </span>

        <h2
          data-anim
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 7vw, 7rem)",
            lineHeight: 1.05,
            color: "#000",
            marginBottom: "2.5rem",
            opacity: 0,
          }}
        >
          Let&apos;s build something.
        </h2>

        <a
          data-anim
          href="mailto:hello@6v1d.studio"
          className="contact-link"
          style={{ opacity: 0, display: "inline-block" }}
        >
          hello@6v1d.studio
        </a>

        {/* Footer line */}
        <div
          data-anim
          style={{
            marginTop: "6rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(0,0,0,0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1rem",
              fontWeight: 300,
              color: "#000",
              letterSpacing: "0.05em",
            }}
          >
            6v1d — {new Date().getFullYear()}
          </span>
          <span
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.4)",
            }}
          >
            Six voices. One direction.
          </span>
        </div>
      </div>
    </section>
  );
}
