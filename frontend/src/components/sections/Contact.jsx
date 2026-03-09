export default function Contact({ isMobile }) {
  return (
    <section style={{ background: "#000", color: "#fff", padding: isMobile ? "4rem 1rem" : "6rem 1.5rem", borderTop: "1px solid rgba(251,191,36,0.1)" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>

        <p style={{ color: "#FBBF24", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          Get In Touch
        </p>

        <h2 style={{ fontSize: isMobile ? "1.8rem" : "clamp(2rem, 5vw, 3rem)", fontWeight: 800, marginBottom: "3rem" }}>
          Contact Us
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>

          <div style={{ background: "#111", border: "1px solid rgba(251,191,36,0.15)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>📍</div>
            <p style={{ color: "#FBBF24", fontWeight: 700, marginBottom: "0.3rem" }}>Address</p>
            <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>Bologna, Italia</p>
          </div>

          <div style={{ background: "#111", border: "1px solid rgba(251,191,36,0.15)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>📞</div>
            <p style={{ color: "#FBBF24", fontWeight: 700, marginBottom: "0.3rem" }}>Phone</p>
            <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>+39 349 617 2707</p>
          </div>

          <div style={{ background: "#111", border: "1px solid rgba(251,191,36,0.15)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>🕐</div>
            <p style={{ color: "#FBBF24", fontWeight: 700, marginBottom: "0.3rem" }}>Hours</p>
            <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>Mon-Sat : 9am-7pm</p>
          </div>

        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>

          <a href="https://www.facebook.com/hamid.fmi.7" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #1877F240", color: "#1877F2", padding: "0.6rem 1.5rem", borderRadius: "999px", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
            Facebook
          </a>

          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #E4405F40", color: "#E4405F", padding: "0.6rem 1.5rem", borderRadius: "999px", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
            Instagram
          </a>

          <a href="https://wa.me/393496172707" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #25D36640", color: "#25D366", padding: "0.6rem 1.5rem", borderRadius: "999px", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
            WhatsApp
          </a>

        </div>

      </div>
    </section>
  )
}