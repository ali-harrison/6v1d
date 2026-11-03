"use client";

import { useSyncExternalStore } from "react";
import { Howl, Howler } from "howler";
import { inspirations } from "@/data/inspirations";

const VOLUME = 0.4;
const FADE_MS = 220;

// Site-wide sound switch. Off by default so nothing plays until the visitor
// opts in — the toggle click also counts as the gesture browsers require
// before an AudioContext is allowed to run.
let enabled = false;
const listeners = new Set<() => void>();

// One Howl per clip, created when sound is first switched on (~7MB total,
// so visitors who never turn sound on never download it)
const clips = new Map<string, Howl>();
let current: Howl | null = null;

function getClip(src: string) {
  let howl = clips.get(src);
  if (!howl) {
    howl = new Howl({ src: [src], volume: VOLUME, preload: true });
    clips.set(src, howl);
  }
  return howl;
}

function fadeOut(howl: Howl) {
  if (!howl.playing()) return;
  howl.once("fade", () => {
    howl.stop();
    howl.volume(VOLUME);
  });
  howl.fade(howl.volume(), 0, FADE_MS);
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  if (on) {
    // Creates the AudioContext (if needed) inside the click gesture, then resumes it
    Howler.volume(1);
    Howler.ctx?.resume();
    inspirations.forEach((item) => getClip(item.audio));
  } else {
    Howler.stop();
    current = null;
  }
  listeners.forEach((l) => l());
}

/**
 * Play one clip, fading out whatever was playing.
 * `force` is for explicit "listen" buttons: it switches sound on and lets the
 * play queue until the AudioContext is running. Passive triggers skip the play
 * if the context is still suspended, so they can't pile up and fire at once.
 */
export function playClip(src: string, { force = false } = {}) {
  if (!enabled) {
    if (!force) return;
    setSoundEnabled(true);
  }
  if (!force && Howler.ctx && Howler.ctx.state !== "running") return;

  const howl = getClip(src);
  if (current && current !== howl) fadeOut(current);

  howl.off("fade");
  howl.stop();
  howl.volume(VOLUME);
  howl.play();
  current = howl;
}

export function stopClip() {
  if (current) fadeOut(current);
  current = null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSoundEnabled() {
  return useSyncExternalStore(
    subscribe,
    () => enabled,
    () => false
  );
}
