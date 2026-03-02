import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once at module level
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
