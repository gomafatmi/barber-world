export default function Footer() {
  return (
    <footer
      style={{
        background: "#000",
        borderTop: "1px solid rgba(251,191,36,0.15)",
        color: "#6B7280",
        padding: "3rem 1.5rem",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "#FBBF24",
          fontWeight: 800,
          fontSize: "1.4rem",
          letterSpacing: "0.2em",
          marginBottom: "1rem",
        }}
      >
        BARBER WORLD
      </h2>

      <p style={{ fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  )
}