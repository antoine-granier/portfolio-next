"use client";

import { useEffect, useRef, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

const BAR_DURATION_MS = 2000;
const FADE_OUT_MS = 350;

export function BootScreen({ onComplete }: BootScreenProps) {
  const [fadingOut, setFadingOut] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), BAR_DURATION_MS);
    const completeTimer = setTimeout(
      () => onCompleteRef.current(),
      BAR_DURATION_MS + FADE_OUT_MS,
    );
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="boot-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      style={{
        opacity: fadingOut ? 0 : 1,
        transition: `opacity ${FADE_OUT_MS}ms ease-out`,
        pointerEvents: fadingOut ? "none" : "auto",
      }}
    >
      <div className="boot-memoji h-24 w-24 overflow-hidden rounded-full border-2 border-white/20 bg-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/memoji.png"
          alt="Antoine Granier"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="boot-bar-track mt-10 h-1 w-48 overflow-hidden rounded-full bg-white/20">
        <div className="boot-bar-fill h-full rounded-full bg-white" />
      </div>
    </div>
  );
}
