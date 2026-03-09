import { useState, useEffect } from "react"
import { getReservations } from "../services/api"

export default function Admin() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const res = await getReservations()
      setReservations(res.data)
    } catch (err) {
      setError("Erreur lors du chargement des réservations")
    } finally {
      setLoading(false)
    }
  }

  const filtered = filter === "all"
    ? reservations
    : reservations.filter((r) => r.status === filter)

  const statusColor = (status) => {
    if (status === "confirmed") return "#4ADE80"
    if (status === "cancelled") return "#F87171"
    return "#FBBF24"
  }

  const statusLabel = (status) => {
    if (status === "confirmed") return "Confirmé"
    if (status === "cancelled") return "Annulé"
    return "En attente"
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      padding: "2rem 1.5rem",
      fontFamily: "system-ui, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        marginBottom: "2rem",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "1rem",
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "2.5rem", color: "#FBBF24", margin: 0,
          }}>
            Barber World
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>
            Dashboard Admin — {reservations.length} réservation(s)
          </p>
        </div>

        <a href="/" style={{
          background: "rgba(251,191,36,0.1)",
          border: "1px solid rgba(251,191,36,0.3)",
          color: "#FBBF24", padding: "0.6rem 1.2rem",
          borderRadius: "8px", textDecoration: "none",
          fontSize: "0.9rem",
        }}>
          ← Retour au site
        </a>
      </div>

      {/* Stats */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
      }}>
        {[
          { label: "Total", value: reservations.length, color: "#FBBF24" },
          { label: "En attente", value: reservations.filter(r => r.status === "pending").length, color: "#FBBF24" },
          { label: "Confirmés", value: reservations.filter(r => r.status === "confirmed").length, color: "#4ADE80" },
          { label: "Annulés", value: reservations.filter(r => r.status === "cancelled").length, color: "#F87171" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "#111",
            border: "1px solid rgba(251,191,36,0.15)",
            borderRadius: "12px", padding: "1.2rem",
            textAlign: "center",
          }}>
            <p style={{ color: stat.color, fontSize: "2rem", fontWeight: 800, margin: 0 }}>
              {stat.value}
            </p>
            <p style={{ color: "#9CA3AF", fontSize: "0.85rem", margin: 0 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto 1.5rem",
        display: "flex", gap: "0.5rem", flexWrap: "wrap",
      }}>
        {["all", "pending", "confirmed", "cancelled"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? "#FBBF24" : "rgba(255,255,255,0.06)",
            color: filter === f ? "#000" : "#9CA3AF",
            border: "none", padding: "0.5rem 1rem",
            borderRadius: "999px", cursor: "pointer",
            fontSize: "0.85rem", fontWeight: filter === f ? 700 : 400,
            transition: "all 0.2s",
          }}>
            {f === "all" ? "Tous" : f === "pending" ? "En attente" : f === "confirmed" ? "Confirmés" : "Annulés"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#9CA3AF" }}>Chargement...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "#F87171" }}>{error}</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "#9CA3AF" }}>Aucune réservation</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {filtered.map((r) => (
              <div key={r._id} style={{
                background: "#111",
                border: "1px solid rgba(251,191,36,0.1)",
                borderRadius: "12px", padding: "1.2rem 1.5rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
                gap: "1rem", alignItems: "center",
              }}>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#9CA3AF", fontSize: "0.8rem", margin: 0 }}>{r.phone}</p>
                </div>
                <div>
                  <p style={{ color: "#FBBF24", margin: 0, fontSize: "0.9rem" }}>{r.service}</p>
                </div>
                <div>
                  <p style={{ color: "#fff", margin: 0, fontSize: "0.9rem" }}>
                    {new Date(r.date).toLocaleDateString("fr-FR")}
                  </p>
                  <p style={{ color: "#9CA3AF", fontSize: "0.8rem", margin: 0 }}>{r.time}</p>
                </div>
                <div>
                  <p style={{
                    fontFamily: "monospace", color: "#FBBF24",
                    fontSize: "0.85rem", margin: 0,
                  }}>
                    {r.reservationNumber}
                  </p>
                </div>
                <span style={{
                  background: `${statusColor(r.status)}20`,
                  color: statusColor(r.status),
                  border: `1px solid ${statusColor(r.status)}40`,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px", fontSize: "0.75rem",
                  fontWeight: 600, whiteSpace: "nowrap",
                }}>
                  {statusLabel(r.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}