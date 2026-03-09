import { useEffect } from "react"

export function useGSAP(callback, deps = []) {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.gsap) return
    callback(window.gsap)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function useScrollReveal(ref) {
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !ref.current) return
    const gsap = window.gsap
    gsap.registerPlugin(window.ScrollTrigger)
    gsap.fromTo(
      ref.current.querySelectorAll("[data-reveal]"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    )
  }, [ref])
}