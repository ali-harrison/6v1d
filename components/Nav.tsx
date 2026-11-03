"use client";

import { useEffect, useState } from "react";
import { EMAIL, NAV } from "@/data/site";
import { lockScroll, scrollToId } from "@/lib/lenis";
import { setSoundEnabled, useSoundEnabled } from "@/lib/sound";
import Plus from "./ui/Plus";

function SoundToggle() {
  const soundOn = useSoundEnabled();
  return (
    <button
      type="button"
      onClick={() => setSoundEnabled(!soundOn)}
      aria-pressed={soundOn}
      className={`flex items-center gap-2.5 text-[12px] font-semibold uppercase opacity-70 transition-opacity hover:opacity-100 aria-pressed:opacity-100 ${soundOn ? "sound-on" : ""}`}
    >
      <span className="flex h-3 items-end gap-[2px] text-orchid" aria-hidden="true">
        <span className="sound-bar" />
        <span className="sound-bar" />
        <span className="sound-bar" />
        <span className="sound-bar" />
      </span>
      Sound {soundOn ? "on" : "off"}
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tuck the bar away while scrolling down, bring it back on any scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 160 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    lockScroll(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-premium ${
          hidden && !open ? "-translate-y-full" : ""
        }`}
      >
        <div
          className={`gutter flex items-center justify-between py-4 transition-colors duration-500 md:py-5 ${
            open ? "text-charcoal" : "text-lilac"
          } ${scrolled && !open ? "bg-charcoal/85 backdrop-blur-md" : ""}`}
        >
          <a
            href="#hero"
            onClick={go("hero")}
            aria-label="6v1d — back to top"
            className={`logo-mask block h-[30px] w-[63px] transition-colors duration-500 md:h-[38px] md:w-[80px] ${open ? "bg-charcoal" : "bg-orchid"}`}
          />

          <div className="flex items-center gap-6 md:gap-10">
            <SoundToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex items-center gap-3 text-[12px] font-semibold uppercase"
            >
              {open ? "Close" : "Menu"}
              <span className={`transition-transform duration-500 ease-premium ${open ? "rotate-45 text-charcoal" : "text-orchid"}`}>
                <Plus size={15} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        inert={!open}
        className={`fixed inset-0 z-40 bg-lilac text-charcoal transition-[clip-path] duration-700 ease-premium ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="gutter flex h-full flex-col justify-between overflow-y-auto pb-8 pt-24 md:pt-32">
          <nav aria-label="Sections">
            <ul className="border-t border-charcoal/15">
              {NAV.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    className="group flex items-center justify-between border-b border-charcoal/15 py-3 md:py-4"
                  >
                    <span className="flex items-baseline gap-4 md:gap-8">
                      <span className="eyebrow w-5">{String(i + 1).padStart(2, "0")}</span>
                      <span className="heading text-h1 transition-transform duration-500 ease-premium group-hover:translate-x-3">
                        {item.label}
                      </span>
                    </span>
                    <span className="grid h-[34px] w-[34px] place-items-center border border-orchid transition-colors group-hover:bg-orchid">
                      <Plus size={9} className="plus-spin" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <p className="eyebrow mb-3 text-charcoal/60">Enquiries</p>
              <a href={`mailto:${EMAIL}`} className="draw-underline text-h5 font-medium">
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3 text-charcoal/60">Based in</p>
              <p className="text-h5 font-medium uppercase">Aotearoa New Zealand</p>
            </div>
            <div className="md:justify-self-end">
              <p className="eyebrow mb-3 text-charcoal/60">Listen along</p>
              <SoundToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
