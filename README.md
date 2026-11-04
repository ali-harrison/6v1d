# 6v1d

Six Voices. One Direction. A concept site about six people whose work shaped mine: J. Cole, Virgil Abloh, Michael Jackson, Pharrell Williams, Tame Iti and Stan Lee.

Live at https://6v1d.vercel.app

Built with Next.js, TypeScript, Tailwind, Three.js, GSAP, Lenis and Howler.

## Notes

The logo in the hero is a Three.js shader that draws the wordmark through a 4×4 Bayer dither, and the pixels push away from your cursor. The section frames reuse the same dither matrix so the whole page feels like one system.

The marquee behind the hero follows a sine wave that shifts as you scroll. Lenis runs off GSAP's ticker so ScrollTrigger stays in sync with it.

Sound is off by default. Switch it on and each voice gets a short clip.

The voices, quotes and principles live in `data/`.

It's a concept, so the contact details and social links are placeholders, and the photos and audio belong to their owners.

## Running it

```bash
npm install
npm run dev
```
