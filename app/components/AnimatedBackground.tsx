"use client";
import { useEffect } from "react";

export default function AnimatedBackground() {
  useEffect(() => {
    const root = document.documentElement;
    const handle = (e: MouseEvent) => {
      root.style.setProperty("--x", `${e.clientX}px`);
      root.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  return (
    <>
      <div className="background-veil" />
      <div className="moving-light" />
    </>
  );
}
