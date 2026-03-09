import { useRef, useEffect, useState } from "react"

export default function Hero({ onBook, isMobile }) {
  const heroRef = useRef(null)
  const [typed, setTyped] = useState("")
  const fullName = "Hamid M.M"

  // Effet typewriter sur le nom
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullName.length) {
        setTyped(fullName.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Animations GSAP
  useEffect(() => {
    const init = () => {
      if (!window.gsap) { setTimeout(init, 100); return }
      const gsap = window.gsap

      // Particules dorées
      const canvas = document.getElementById("hero-canvas")
      if (canvas) {
        const ctx = canvas.getContext("2d")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const particles = Array.from({ length: 60 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.6 + 0.2,
        }))
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          particles.forEach((p) => {
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(251,191,36,${p.opacity})`
            ctx.fill()
            p.x += p.dx
            p.y += p.dy
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1
          })
          requestAnimationFrame(animate)
        }
        animate()
      }

      // Animations entrée
      gsap.fromTo(".hero-avatar",
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      )
      gsap.fromTo(".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.5 }
      )
      gsap.fromTo(".hero-btn",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)", delay: 1.8 }
      )
    }
    init()
  }, [])

  return (
    <section
      id="accueil"
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "radial-gradient(ellipse at 50% 60%, #1a1000 0%, #000 70%)",
        color: "#fff",
        padding: isMobile ? "5rem 1rem 2rem" : "6rem 1.5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Particules dorées */}
      <canvas id="hero-canvas" style={{
        position: "absolute", inset: 0,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Anneaux décoratifs */}
      {!isMobile && (
        <>
          <div style={{
            position: "absolute", width: "500px", height: "500px",
            borderRadius: "50%", border: "1px solid rgba(251,191,36,0.08)",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            pointerEvents: "none", zIndex: 0,
          }} />
          <div style={{
            position: "absolute", width: "750px", height: "750px",
            borderRadius: "50%", border: "1px solid rgba(251,191,36,0.04)",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            pointerEvents: "none", zIndex: 0,
          }} />
        </>
      )}

      {/* Avatar avec effet drapeau CSS */}
      <style>{`
        @keyframes flag {
          0%   { border-radius: 50% 60% 55% 45% / 50% 45% 55% 50%; box-shadow: 0 0 40px rgba(251,191,36,0.3), 0 0 80px rgba(251,191,36,0.1); }
          25%  { border-radius: 55% 45% 60% 40% / 45% 55% 45% 55%; box-shadow: 0 0 60px rgba(251,191,36,0.5), 0 0 100px rgba(251,191,36,0.2); }
          50%  { border-radius: 45% 55% 45% 55% / 55% 45% 55% 45%; box-shadow: 0 0 40px rgba(251,191,36,0.3), 0 0 80px rgba(251,191,36,0.1); }
          75%  { border-radius: 60% 40% 55% 45% / 45% 60% 40% 55%; box-shadow: 0 0 60px rgba(251,191,36,0.5), 0 0 100px rgba(251,191,36,0.2); }
          100% { border-radius: 50% 60% 55% 45% / 50% 45% 55% 50%; box-shadow: 0 0 40px rgba(251,191,36,0.3), 0 0 80px rgba(251,191,36,0.1); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        .hero-avatar-wrapper {
          animation: floatY 4s ease-in-out infinite;
        }
        .hero-avatar-img {
          animation: flag 6s ease-in-out infinite;
          border: 3px solid #FBBF24;
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .cursor {
          animation: cursorBlink 0.8s infinite;
          color: #FBBF24;
        }
      `}</style>

      {/* Avatar flottant + drapeau */}
      <div
        className="hero-avatar hero-avatar-wrapper"
        style={{
          width: isMobile ? "140px" : "180px",
          height: isMobile ? "140px" : "180px",
          marginBottom: isMobile ? "1.5rem" : "2rem",
          position: "relative", zIndex: 1, opacity: 0,
        }}
      >
        <img
          className="hero-avatar-img"
          src="/images/barber-avatar.jpg"
          alt="Barber"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
          }}
        />
      </div>

      {/* Nom avec typewriter */}
      <h1
        className="hero-title"
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: isMobile ? "3rem" : "clamp(3rem, 8vw, 5.5rem)",
          color: "#FBBF24",
          margin: "0 0 1rem",
          textShadow: "0 0 60px rgba(251,191,36,0.3)",
          position: "relative", zIndex: 1,
          minHeight: isMobile ? "4rem" : "6rem",
        }}
      >
        {typed}{typed.length === fullName.length && (
  <span style={{
    display: "inline-block",
    marginLeft: "6px",
    fontSize: "1.2em",
    color: "#4169E1",
    animation: "starPop 0.5s ease-out forwards",
    textShadow: "0 0 20px rgba(65,105,225,0.8), 0 0 40px rgba(65,105,225,0.4)",
  }}>★</span>
)}
      </h1>

      {/* Tagline calligraphie luxe */}
      <p
        className="hero-sub"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic", fontWeight: 300,
          fontSize: isMobile ? "1.2rem" : "clamp(1.4rem, 3.5vw, 2rem)",
          color: "#E5C97E",
          marginBottom: isMobile ? "2rem" : "2.5rem",
          letterSpacing: isMobile ? "0.08em" : "0.12em",
          cursor: "default", opacity: 0,
          transition: "color 0.4s, text-shadow 0.4s, letter-spacing 0.4s",
          textShadow: "0 0 30px rgba(251,191,36,0.15), 0 2px 8px rgba(0,0,0,0.6)",
          position: "relative", zIndex: 1,
          padding: isMobile ? "0 1rem" : 0,
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#FFFFFF"
          e.target.style.letterSpacing = "0.22em"
          e.target.style.textShadow = "0 0 20px rgba(251,191,36,0.9), 0 0 50px rgba(251,191,36,0.5), 0 0 4px rgba(255,255,255,0.8)"
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#E5C97E"
          e.target.style.letterSpacing = isMobile ? "0.08em" : "0.12em"
          e.target.style.textShadow = "0 0 30px rgba(251,191,36,0.15), 0 2px 8px rgba(0,0,0,0.6)"
        }}
      >
        Luxury Cuts for Modern Men
      </p>

      {/* Bouton Book Now */}
      <button
        className="hero-btn"
        onClick={onBook}
        style={{
          background: "#FBBF24", color: "#000", border: "none",
          padding: isMobile ? "0.85rem 2rem" : "0.9rem 2.5rem",
          borderRadius: "8px", fontWeight: 700,
          fontSize: isMobile ? "0.95rem" : "1rem",
          cursor: "pointer", letterSpacing: "0.08em", opacity: 0,
          transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
          boxShadow: "0 4px 20px rgba(251,191,36,0.3)",
          position: "relative", zIndex: 1,
          width: isMobile ? "80%" : "auto",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#F59E0B"
          e.target.style.transform = "translateY(-3px)"
          e.target.style.boxShadow = "0 8px 30px rgba(251,191,36,0.6)"
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#FBBF24"
          e.target.style.transform = "translateY(0)"
          e.target.style.boxShadow = "0 4px 20px rgba(251,191,36,0.3)"
        }}
      >
        Book Now
      </button>

    </section>
  )
}