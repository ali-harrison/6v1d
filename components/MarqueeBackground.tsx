'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// — Wave config (mirrors DualWaveAnimation.js) —————————————————————————————
// waveNumber: radians per item index — controls how many sine cycles span the list.
// 0.8 ≈ ~2 full cycles visible across the viewport at once.
const WAVE_NUMBER = 0.8
// waveSpeed: full cycles the wave shifts per full-page scroll (1 = one full cycle)
const WAVE_SPEED  = 1
// Enough items to fill the viewport height + generous overflow top and bottom
const ITEM_COUNT  = 30

// ——————————————————————————————————————————————————————————————————————————

export default function MarqueeBackground() {
  const leftColRef  = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const leftCol  = leftColRef.current
    const rightCol = rightColRef.current
    if (!leftCol || !rightCol) return

    // Mirror of DualWaveAnimation.setupAnimation ——————————————————————————
    const leftTexts  = gsap.utils.toArray<HTMLElement>(leftCol.querySelectorAll('[data-wave]'))
    const rightTexts = gsap.utils.toArray<HTMLElement>(rightCol.querySelectorAll('[data-wave]'))
    if (!leftTexts.length || !rightTexts.length) return

    // gsap.quickTo: spring-like smooth setter — exact pattern from the source
    const leftSetters  = leftTexts.map(el  => gsap.quickTo(el,  'x', { duration: 0.6, ease: 'power4.out' }))
    const rightSetters = rightTexts.map(el => gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power4.out' }))

    // Mirror of DualWaveAnimation.calculateRanges ————————————————————————
    // Range = column width − widest text node in that column.
    // This keeps every item within the column's bounds.
    function getRange(col: HTMLElement, texts: HTMLElement[]): number {
      const maxW = Math.max(...texts.map(t => t.offsetWidth))
      return Math.max(0, col.offsetWidth - maxW)
    }

    // Mirror of DualWaveAnimation.calculateWavePosition ——————————————————
    // phase = waveNumber * index  +  waveSpeed * progress * 2π  −  π/2
    // The −π/2 ensures index 0 starts at the left edge (sin(−π/2) = −1 → normalised 0).
    function waveX(index: number, progress: number, range: number): number {
      const phase = WAVE_NUMBER * index + WAVE_SPEED * progress * Math.PI * 2 - Math.PI / 2
      return ((Math.sin(phase) + 1) / 2) * range   // mapped to [0, range]
    }

    // Mirror of DualWaveAnimation.setInitialPositions ————————————————————
    // Snap items to their wave position at progress = 0 (no quickTo lag on load)
    let leftRange  = getRange(leftCol,  leftTexts)
    let rightRange = getRange(rightCol, rightTexts)

    leftTexts.forEach((el, i)  => gsap.set(el, { x:  waveX(i, 0, leftRange)  }))
    rightTexts.forEach((el, i) => gsap.set(el, { x: -waveX(i, 0, rightRange) }))

    // Mirror of DualWaveAnimation.setupScrollTrigger ———————————————————
    // Trigger on document.body (fixed component has no scroll position of its own).
    const st = ScrollTrigger.create({
      trigger: document.body,
      start:   'top top',
      end:     'bottom bottom',
      onUpdate(self) {
        const p    = self.progress
        leftRange  = getRange(leftCol,  leftTexts)
        rightRange = getRange(rightCol, rightTexts)

        // Left col: positive x → items push rightward from left edge
        leftTexts.forEach((_, i)  => leftSetters[i]( waveX(i, p, leftRange)))
        // Right col: negative x → items push leftward from right edge (mirror)
        rightTexts.forEach((_, i) => rightSetters[i](-waveX(i, p, rightRange)))
      },
    })

    const onResize = () => {
      leftRange  = getRange(leftCol,  leftTexts)
      rightRange = getRange(rightCol, rightTexts)
    }
    window.addEventListener('resize', onResize)

    return () => {
      st.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const itemStyle: React.CSSProperties = {
    fontFamily:    'var(--font-barlow)',
    fontSize:      'clamp(2rem, 5vw, 3rem)',
    fontWeight:    300,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color:         'rgba(255, 255, 255, 0.04)',
    whiteSpace:    'nowrap',
    width:         'max-content',
    lineHeight:    0.85,
    userSelect:    'none',
  }

  const colStyle: React.CSSProperties = {
    flex:           1,
    display:        'flex',
    flexDirection:  'column',
    justifyContent: 'center',   // centres the list; items overflow above/below are clipped
    gap:            '1.25rem',
    overflow:       'hidden',
  }

  return (
    <div
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        display:       'flex',
        overflow:      'hidden',
      }}
    >
      {/* Left column — aligned to start; wave translates items rightward */}
      <div ref={leftColRef} style={{ ...colStyle, alignItems: 'flex-start' }}>
        {Array.from({ length: ITEM_COUNT }, (_, i) => (
          <div key={i} data-wave="" style={itemStyle}>SIX VOICES</div>
        ))}
      </div>

      {/* Right column — aligned to end; wave translates items leftward (negative x) */}
      <div ref={rightColRef} style={{ ...colStyle, alignItems: 'flex-end' }}>
        {Array.from({ length: ITEM_COUNT }, (_, i) => (
          <div key={i} data-wave="" style={itemStyle}>ONE DIRECTION</div>
        ))}
      </div>
    </div>
  )
}
