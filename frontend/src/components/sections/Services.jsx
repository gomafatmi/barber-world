import { useRef } from "react"
import { useScrollReveal } from "../../hooks/useGSAP"
import { SERVICES } from "../../data/data"

function ServiceCard({ service, onBook, isMobile }) {
  return (
    <div
      data-reveal
      onClick={() => onBook(service.title)}
      style={{
        background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
        border: "1px solid rgba(251,191,36,0.15)",
        borderRadius: "16px",
        padding: isMobile ? "1.5rem" : "2rem",
        cursor: "pointer",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)"
        e.currentTarget.style.borderColor = "rgba(251,191,36,0.6)"
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.borderColor = "rgba(251,191,36,0.15)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <div style={{ fontSize: isMobile ? "2rem" : "2.5rem", marginBottom: "1rem" }}>
        {service.icon}
      </div>

      <h3 style={{
        color: "#FBBF24",
        fontSize: isMobile ? "1.1rem" : "1.3rem",
        fontWeight: 700, marginBottom: "0.5rem",
      }}>
        {service.title}
      </h3>

      <p style={{
        color: "#9CA3AF",
        fontSize: isMobile ? "0.85rem" : "0.9rem",
        lineHeight: 1.6, marginBottom: "1rem",
      }}>
        {service.desc}
      </p>

      {/* Étiquettes */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.2rem" }}>
        {service.tags.map((tag, i) => (
          <span key={i} style={{
            background: i === 0
              ? "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.1))"
              : "rgba(255,255,255,0.06)",
            border: i === 0
              ? "1px solid rgba(251,191,36,0.5)"
              : "1px solid rgba(255,255,255,0.12)",
            color: i === 0 ? "#FBBF24" : "#9CA3AF",
            padding: "0.25rem 0.65rem",
            borderRadius: "999px",
            fontSize: "0.72rem",
            fontWeight: i === 0 ? 600 : 400,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Bouton réserver uniquement — sans prix */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span style={{
          background: "#FBBF24", color: "#000",
          padding: "0.35rem 1rem", borderRadius: "6px",
          fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em",
        }}>
          Book
        </span>
      </div>

    </div>
  )
}

export default function Services({ onBook, isMobile }) {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} style={{
      background: "#000", color: "#fff",
      padding: isMobile ? "4rem 1rem" : "6rem 1.5rem",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <p data-reveal style={{
          color: "#FBBF24", textAlign: "center", letterSpacing: "0.2em",
          textTransform: "uppercase", fontSize: "0.85rem",
          marginBottom: "0.5rem", opacity: 0,
        }}>
          What We Offer
        </p>

        <h2 data-reveal style={{
          textAlign: "center",
          fontSize: isMobile ? "1.8rem" : "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800, marginBottom: isMobile ? "2rem" : "3.5rem",
          opacity: 0,
        }}>
          Our Services
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: isMobile ? "1rem" : "1.5rem",
        }}>
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} onBook={onBook} isMobile={isMobile} />
          ))}
        </div>

      </div>
    </section>
  )
}