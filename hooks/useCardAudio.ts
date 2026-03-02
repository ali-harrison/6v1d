'use client'

import { useCallback, useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler'

// Resume the AudioContext on the first qualifying user gesture.
// mouseenter doesn't qualify; mousedown/pointerdown/keydown/touchstart do.
// We capture at the document root so any interaction on the page unlocks audio.
let unlocked = false

function ensureUnlocked() {
  if (unlocked) return
  unlocked = true

  const unlock = () => Howler.ctx?.resume()

  document.addEventListener('mousedown',   unlock, { once: true, passive: true, capture: true })
  document.addEventListener('pointerdown', unlock, { once: true, passive: true, capture: true })
  document.addEventListener('keydown',     unlock, { once: true, passive: true, capture: true })
  document.addEventListener('touchstart',  unlock, { once: true, passive: true, capture: true })
}

export function useCardAudio(src: string) {
  const soundRef = useRef<Howl | null>(null)

  useEffect(() => {
    ensureUnlocked()

    const sound = new Howl({ src: [src], volume: 0.4, loop: false, preload: true })
    soundRef.current = sound

    return () => {
      sound.stop()
      sound.unload()
      if (soundRef.current === sound) soundRef.current = null
    }
  }, [src])

  const play = useCallback(() => {
    const howl = soundRef.current
    if (!howl) return

    // If the AudioContext is still suspended, bail out — do NOT queue the play.
    // Queuing causes every card hovered pre-click to fire simultaneously when
    // the context finally resumes, which is the root cause of the mass-play bug.
    if (Howler.ctx && Howler.ctx.state !== 'running') return

    howl.stop() // reset to start if re-hovered while already playing
    howl.play()
  }, [])

  const stop = useCallback(() => {
    soundRef.current?.stop()
  }, [])

  return { play, stop }
}
