import { useState, useRef } from "react"
import { useScrollReveal } from "../../hooks/useGSAP"
import { GALLERY_IMAGES } from "../../data/data"

function GalleryCard({ img, index, isMobile }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        aspectRatio: "4/3",
        position: "relative",
        cursor: "pointer",
        border: hovered
          ? "2px solid #4169E1"
          : "1px solid rgba(251,191,36,0.15)",
        boxShadow: hovered
          ? "0 0 0 1px rgba(65,105,225,0.4), 0 8px 40px rgba(65,105,225,0.35)"
          : "0 4px 20px rgba(0,0,0,0.4)",
        transition: "border 0.4s, box-shadow 0.4s",
      }}
    >
      <img
        src={img}
        alt={`cut ${index + 1}`}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.6s ease, filter 0.4s",
          filter: hovered ? "brightness(0.55)" : "brightness(1)",
        }}
      />

      {/* Overlay blanc */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)"
          : "transparent",
        transition: "background 0.4s",
        pointerEvents: "none",
      }} />

      {/* Coins dorés + label — seulement sur desktop */}
      {hovered && !isMobile && (
        <>
          {[
            { top: "10px",    left: "10px",  borderTop:    "2px solid #FBBF24", borderLeft:   "2px solid #FBBF24" },
            { top: "10px",    right: "10px", borderTop:    "2px solid #FBBF24", borderRight:  "2px solid #FBBF24" },
            { bottom: "10px", left: "10px",  borderBottom: "2px solid #FBBF24", borderLeft:   "2px solid #FBBF24" },
            { bottom: "10px", right: "10px", borderBottom: "2px solid #FBBF24", borderRight:  "2px solid #FBBF24" },
          ].map((s, i) => (
            <div key={i} style={{
              position: "absolute", width: "22px", height: "22px",
              ...s, borderRadius: "2px", pointerEvents: "none",
            }} />
          ))}

          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic", color: "#fff",
              fontSize: "1.1rem", letterSpacing: "0.2em",
              textShadow: "0 0 20px rgba(251,191,36,0.8), 0 2px 8px rgba(0,0,0,0.9)",
              borderBottom: "1px solid rgba(251,191,36,0.5)",
              paddingBottom: "4px",
            }}>
              Notre Travail
            </span>
          </div>
        </>
      )}

      {/* Mobile — label toujours visible en bas */}
      {isMobile && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
          padding: "1.5rem 1rem 0.8rem",
          display: "flex", alignItems: "flex-end",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic", color: "#E5C97E",
            fontSize: "0.9rem", letterSpacing: "0.15em",
          }}>
            Notre Travail
          </span>
        </div>
      )}
    </div>
  )
}

export default function GallerySlider({ isMobile }) {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} style={{
      background: "#0A0A0A", color: "#fff",
      padding: isMobile ? "4rem 1rem" : "6rem 1.5rem",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <p data-reveal style={{
          color: "#FBBF24", textAlign: "center", letterSpacing: "0.2em",
          textTransform: "uppercase", fontSize: "0.85rem",
          marginBottom: "0.5rem", opacity: 0,
        }}>
          Our Work
        </p>

        <h2 data-reveal style={{
          textAlign: "center",
          fontSize: isMobile ? "1.8rem" : "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
          marginBottom: isMobile ? "2rem" : "3.5rem",
          opacity: 0,
        }}>
          Gallery
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: isMobile ? "1rem" : "1.5rem",
        }}>
          {GALLERY_IMAGES.map((img, i) => (
            <GalleryCard key={i} img={img} index={i} isMobile={isMobile} />
          ))}
        </div>

      </div>
    </section>
  )
}
