import { useState, useEffect, useRef } from "react"

const LINKS = [
  { label: "Accueil", href: "#Accueil" },
  { label: "Services", href: "#Services" },
  { label: "Galerie", href: "#Gallery" },
  { label: "Contact", href: "#Contact" },
]

export default function Navbar({ isMobile }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("accueil")
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect((

  ) => {
    if (!window.gsap) return
    window.gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    )
  }, [])

  const handleLinkClick = (href) => {
    setMenuOpen(false)
    setActive(href.replace("#", ""))
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        transition: "background 0.4s, box-shadow 0.4s",
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.5)" : "none",
        padding: isMobile ? "0.8rem 1.2rem" : "1rem 2.5rem",
      }}
    >
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", maxWidth: "1200px", margin: "0 auto",
      }}>

        <h1
          onClick={() => handleLinkClick("#accueil")}
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: isMobile ? "1.5rem" : "2rem",
            color: "#FBBF24", margin: 0, cursor: "pointer",
          }}
        >
          Barber World
        </h1>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {LINKS.map((link) => {
              const isActive = active === link.href.replace("#", "")
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  style={{
                    background: "none",
                    border: isActive ? "2px solid #4169E1" : "2px solid transparent",
                    color: isActive ? "#fff" : "#D1D5DB",
                    fontSize: "0.95rem", cursor: "pointer",
                    letterSpacing: "0.05em",
                    padding: "0.45rem 1rem", borderRadius: "8px",
                    fontFamily: "system-ui, sans-serif",
                    transition: "all 0.3s",
                    boxShadow: isActive ? "0 0 12px rgba(65,105,225,0.4)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.border = "2px solid rgba(65,105,225,0.5)"
                      e.currentTarget.style.color = "#fff"
                      e.currentTarget.style.boxShadow = "0 0 8px rgba(65,105,225,0.25)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.border = "2px solid transparent"
                      e.currentTarget.style.color = "#D1D5DB"
                      e.currentTarget.style.boxShadow = "none"
                    }
                  }}
                >
                  {link.label}
                </button>
              )
            })}
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "none",
              cursor: "pointer", padding: "0.4rem",
              display: "flex", flexDirection: "column", gap: "5px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: "24px", height: "2px",
                background: "#FBBF24", borderRadius: "2px",
                transition: "transform 0.3s, opacity 0.3s",
                opacity: menuOpen && i === 1 ? 0 : 1,
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                  : i === 2 ? "rotate(-45deg) translate(5px, -5px)"
                  : "none"
                  : "none",
              }} />
            ))}
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(0,0,0,0.97)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(251,191,36,0.2)",
          padding: "1.5rem",
          display: "flex", flexDirection: "column", gap: "0.8rem",
        }}>
          {LINKS.map((link) => {
            const isActive = active === link.href.replace("#", "")
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  background: "none",
                  border: isActive ? "2px solid #4169E1" : "2px solid transparent",
                  color: isActive ? "#fff" : "#D1D5DB",
                  fontSize: "1rem", cursor: "pointer",
                  textAlign: "left", padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  fontFamily: "system-ui, sans-serif",
                  transition: "all 0.3s",
                  boxShadow: isActive ? "0 0 12px rgba(65,105,225,0.4)" : "none",
                }}
              >
                {link.label}
              </button>
            )
          })}
        </div>
      )}
    </nav>
  )
}