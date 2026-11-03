'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ─── Vertex shader ───────────────────────────────────────────────────────────
const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// ─── Fragment shader ──────────────────────────────────────────────────────────
const frag = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float     uTime;
  uniform vec2      uMouse;
  uniform float     uRepulseRadius;
  uniform float     uAssemble;   // 0 = fully scattered  →  1 = fully assembled
  uniform float     uScroll;     // 0 = normal           →  1 = fully dispersed
  uniform vec2      uScale;      // canvas size ÷ displayed texture size (aspect-correct fit)
  uniform vec3      uColor;      // dot colour
  varying vec2      vUv;

  // ── Bayer 4×4 ordered dither matrix (screen-space fixed grid) ────────────────
  float bayer4x4(vec2 fragCoord) {
    int x = int(mod(fragCoord.x, 4.0));
    int y = int(mod(fragCoord.y, 4.0));
    if      (y==0 && x==0) return  0.0/16.0;
    else if (y==0 && x==1) return  8.0/16.0;
    else if (y==0 && x==2) return  2.0/16.0;
    else if (y==0 && x==3) return 10.0/16.0;
    else if (y==1 && x==0) return 12.0/16.0;
    else if (y==1 && x==1) return  4.0/16.0;
    else if (y==1 && x==2) return 14.0/16.0;
    else if (y==1 && x==3) return  6.0/16.0;
    else if (y==2 && x==0) return  3.0/16.0;
    else if (y==2 && x==1) return 11.0/16.0;
    else if (y==2 && x==2) return  1.0/16.0;
    else if (y==2 && x==3) return  9.0/16.0;
    else if (y==3 && x==0) return 15.0/16.0;
    else if (y==3 && x==1) return  7.0/16.0;
    else if (y==3 && x==2) return 13.0/16.0;
    else                    return  5.0/16.0;
  }

  // ── Stable hash — maps a 2D point to a deterministic [0,1]² value ────────────
  vec2 hash22(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  void main() {
    // Canvas UV → texture UV, centred and aspect-correct. All effects below
    // work in texture space so the logo keeps its proportions at any viewport.
    vec2 base = (vUv - 0.5) * uScale + 0.5;
    vec2 uv   = base;

    // ── Assemble animation ────────────────────────────────────────────────────
    // Quantise the UV into a 24×24 grid so each "particle" is a small cluster
    // of pixels that share one consistent scatter vector and timing.
    vec2 cell       = floor(base * 24.0) / 24.0;
    vec2 cellCenter = cell + (0.5 / 24.0);   // centre of this cell — for distance calc
    vec2 rnd        = hash22(cell);
    vec2 scatter    = (rnd - 0.5) * 1.3;     // random offset range ±0.65 UV

    // Stagger by distance from centre: outer cells start assembling later.
    // When uAssemble < distC*0.35  → cell is still fully scattered (tSmooth = 0).
    // When uAssemble = 1           → all cells are fully assembled (tSmooth = 1).
    float distC   = length(cellCenter - 0.5) * 2.0;   // [0, 1]
    float tLocal  = clamp((uAssemble - distC * 0.35) / 0.65, 0.0, 1.0);
    float tSmooth = tLocal * tLocal * (3.0 - 2.0 * tLocal);  // smoothstep ease

    // Move sample UV from scattered position toward true UV as tSmooth → 1
    uv += scatter * (1.0 - tSmooth);

    // ── Scroll disassemble ────────────────────────────────────────────────────
    // Each cell drifts outward in a direction that blends radial + noise,
    // creating organic dispersal rather than a uniform radial explosion.
    vec2 noiseDir = hash22(cell + 7.3) * 2.0 - 1.0;              // random per-cell
    vec2 radial   = normalize(base - 0.5 + vec2(0.001));          // outward from centre
    vec2 driftDir = normalize(mix(radial, noiseDir, 0.55));        // blend: organic radial
    float scrollEase = uScroll * uScroll;                          // ease-in: gentle start
    uv += driftDir * scrollEase * 0.9;

    // ── Mouse repulsion ───────────────────────────────────────────────────────
    float d = distance(uv, uMouse);
    if (d < uRepulseRadius && d > 0.001) {
      uv += normalize(uv - uMouse) * (1.0 - d / uRepulseRadius) * 0.08;
    }

    // ── Texture sample ────────────────────────────────────────────────────────
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) { gl_FragColor = vec4(0.0); return; }
    vec4 tex = texture2D(uTexture, uv);
    if (tex.a < 0.01) { gl_FragColor = vec4(0.0); return; }

    // ── Bayer dither + breathing wave ─────────────────────────────────────────
    float threshold = bayer4x4(gl_FragCoord.xy);
    float wave      = sin(uv.x * 3.0 + uTime * 0.5) * cos(uv.y * 2.0 + uTime * 0.3);
    float global    = 0.38 + 0.10 * sin(uTime * 0.3);
    float value     = tex.a * clamp(global + wave * 0.15, 0.15, 0.60);

    // Particles materialise as they arrive (opacity 0 → full over assembly)
    value *= tSmooth;
    // Fade dither dots as logo disperses on scroll
    value *= 1.0 - uScroll * 0.75;

    if (value > threshold) {
      gl_FragColor = vec4(uColor, 1.0);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`

// ─── Fit ──────────────────────────────────────────────────────────────────────
// logo.png is 16:9 with the artwork occupying ~63% of its width. On wide
// screens the texture spans the viewport width (artwork ≈ 63% wide); on narrow
// screens it scales up so the artwork reaches ~90% of the width.
const TEX_ASPECT = 1920 / 1080
const ART_WIDTH  = 0.63

function textureScale(cw: number, ch: number): [number, number] {
  const t        = Math.min(Math.max((cw - 400) / 800, 0), 1)
  const artFrac  = 0.9 + (ART_WIDTH - 0.9) * t
  const texW     = Math.min((cw * artFrac) / ART_WIDTH, ch * 1.9)
  const texH     = texW / TEX_ASPECT
  return [cw / texW, ch / texH]
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

// ─── Component ────────────────────────────────────────────────────────────────
interface Props {
  src?: string
  color?: string
}

export default function LogoShader({ src = '/logo.png', color = '#ffffff' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    const geometry = new THREE.PlaneGeometry(2, 2)

    // ── Shader material ───────────────────────────────────────────────────────
    const material = new THREE.ShaderMaterial({
      vertexShader:   vert,
      fragmentShader: frag,
      uniforms: {
        uTexture:       { value: null },
        uTime:          { value: 0 },
        uMouse:         { value: new THREE.Vector2(0.5, 0.5) },
        uRepulseRadius: { value: 0.06 },
        uAssemble:      { value: 0 },   // starts at 0 (scattered), animated to 1
        uScroll:        { value: 0 },   // driven by ScrollTrigger
        uScale:         { value: new THREE.Vector2(1, 1) },
        // Raw sRGB values — ShaderMaterial skips colour management, so a
        // THREE.Color (stored linear) would render darker than the hex
        uColor:         { value: new THREE.Vector3(...hexToRgb(color)) },
      },
      transparent: true,
      depthWrite:  false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const targetMouse  = { x: 0.5, y: 0.5 }
    const currentMouse = { x: 0.5, y: 0.5 }
    const parent = canvas.parentElement

    // Mouse is mapped into the same texture space the shader samples in
    function onMouseMove(e: MouseEvent) {
      const rect  = canvas!.getBoundingClientRect()
      const scale = material.uniforms.uScale.value as THREE.Vector2
      targetMouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * scale.x + 0.5
      targetMouse.y = (0.5 - (e.clientY - rect.top) / rect.height) * scale.y + 0.5
    }
    function onMouseLeave() { targetMouse.x = 0.5; targetMouse.y = 0.5 }

    if (parent) {
      parent.addEventListener('mousemove', onMouseMove)
      parent.addEventListener('mouseleave', onMouseLeave)
    }

    // ── Sizing ────────────────────────────────────────────────────────────────
    function resize() {
      const p = canvas!.parentElement
      const w = p ? p.clientWidth  : window.innerWidth
      const h = p ? p.clientHeight : window.innerHeight
      renderer.setSize(w, h, false)
      material.uniforms.uScale.value.set(...textureScale(w, h))
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    // ── GSAP assemble tween + ScrollTrigger — set up once texture loads ───────
    let assembleTween: ReturnType<typeof gsap.to> | null = null
    let scrollST: ScrollTrigger | null = null
    let loadedTexture: THREE.Texture | null = null

    const loader = new THREE.TextureLoader()
    loader.load(src, (texture) => {
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      loadedTexture = texture
      material.uniforms.uTexture.value = texture

      // Assemble: particles pull inward from scatter, outer ones arriving last
      assembleTween = gsap.to(material.uniforms.uAssemble, {
        value:    1,
        duration: 2.5,
        ease:     'power3.out',
        delay:    0.2,
      })

      // Scroll disassemble — scrubbed against the hero section scroll distance
      const heroSection = canvas!.closest('section') as HTMLElement | null
      if (heroSection) {
        scrollST = ScrollTrigger.create({
          trigger: heroSection,
          start:   'top top',
          end:     'bottom top',   // hero fully scrolled off → uScroll = 1
          scrub:   true,
          onUpdate(self) {
            material.uniforms.uScroll.value = self.progress
          },
        })
      }
    })

    // ── Animation loop — paused while the hero is off screen ──────────────────
    const timer = new THREE.Timer()
    let raf = 0
    let visible = true

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) animate()
    })
    io.observe(canvas)

    function animate() {
      if (!visible) return
      raf = requestAnimationFrame(animate)
      timer.update()
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08
      material.uniforms.uMouse.value.set(currentMouse.x, currentMouse.y)
      material.uniforms.uTime.value = timer.getElapsed()
      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      assembleTween?.kill()
      scrollST?.kill()
      if (parent) {
        parent.removeEventListener('mousemove', onMouseMove)
        parent.removeEventListener('mouseleave', onMouseLeave)
      }
      geometry.dispose()
      material.dispose()
      loadedTexture?.dispose()
      renderer.dispose()
    }
  }, [src, color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
      }}
      aria-hidden="true"
    />
  )
}
