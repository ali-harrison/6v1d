# 6v1d: Six Voices. One Direction.

A concept site about six people who shaped how I work: J. Cole, Virgil Abloh, Michael Jackson, Pharrell Williams, Tame Iti and Stan Lee. It moves from the voices themselves, to the approach they taught, to the principles that come out of it.

**Live:** https://6v1d.vercel.app

Designed and built by Ali Werahiko Te Wairama Harrison ([Te Wairama Digital](https://tewairama.digital)).

## Highlights

- **Shader logo:** the hero wordmark is a Three.js fragment shader using a 4×4 ordered (Bayer) dither, so it renders as a field of pixels that pushes away from the cursor.
- **One dither system:** the section frames reuse the same dither matrix, so the hero and the rest of the page read as one visual language.
- **Scroll-driven type:** the background marquee rides a sine wave that shifts as you scroll.
- **Listen along:** an optional sound layer (off by default) plays a short clip for each voice.
- **Smooth scrolling:** Lenis is synced to the GSAP ticker so ScrollTrigger stays accurate.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, Three.js, GSAP + ScrollTrigger, Lenis, Howler.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Content (voices, quotes, approach and principles) lives in `data/`.

## Notes

This is a concept piece. Contact details and social links are placeholders, and the photography and audio belong to their respective owners.
