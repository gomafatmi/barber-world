import { useState } from "react"
import { createReservation } from "../../services/api"
import { SERVICES } from "../../data/data"

const HORAIRES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
]

export default function ReservationFormOverlay({ service, onClose, isMobile }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: service || "Classic Cut",
    date: "",
    time: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [reservationNumber, setReservationNumber] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.date || !form.time) {
      setError("Veuillez remplir tous les champs")
      return
    }
    setError("")
    setLoading(true)
    try {
      const res = await createReservation(form)
      setReservationNumber(res.reservationNumber)
      setSuccess(true)
    } catch (err) {
      setError("Erreur lors de la réservation. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    padding: "0.85rem 1rem",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  }

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100, padding: "1rem",
        overflowY: "auto",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "linear-gradient(135deg, #111 0%, #1a1100 100%)",
        border: "1px solid rgba(251,191,36,0.3)",
        borderRadius: "20px",
        padding: isMobile ? "1.5rem" : "2.5rem",
        width: "100%", maxWidth: "480px",
        color: "#fff", position: "relative",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        margin: "auto",
      }}>

        {/* Bouton fermer */}
        <button onClick={onClose} style={{
          position: "absolute", top: "1rem", right: "1rem",
          background: "rgba(255,255,255,0.1)", border: "none",
          color: "#fff", width: "32px", height: "32px",
          borderRadius: "50%", cursor: "pointer", fontSize: "1rem",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>✕</button>

        {!success ? (
          <>
            <h2 style={{ color: "#FBBF24", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.3rem" }}>
              Reservation
            </h2>
            <p style={{ color: "#9CA3AF", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
              Fill in the form below
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Nom */}
              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />

              {/* Téléphone */}
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                value={form.phone}
                onChange={handleChange}
                style={inputStyle}
              />

              {/* Service */}
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                style={selectStyle}
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.title}
                    style={{ background: "#111", color: "#fff" }}>
                    {s.title} — {s.price}
                  </option>
                ))}
              </select>

              {/* Date */}
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                style={inputStyle}
              />

              {/* Heure */}
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                style={selectStyle}
              >
                <option value="" style={{ background: "#111" }}>
                  Choose a time
                </option>
                {HORAIRES.map((h) => (
                  <option key={h} value={h} style={{ background: "#111", color: "#fff" }}>
                    {h}
                  </option>
                ))}
              </select>

              {/* Erreur */}
              {error && (
                <p style={{ color: "#F87171", fontSize: "0.85rem", textAlign: "center" }}>
                  {error}
                </p>
              )}

              {/* Bouton confirmer */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  background: loading ? "#9CA3AF" : "#FBBF24",
                  color: "#000", border: "none",
                  padding: "1rem", borderRadius: "10px",
                  fontWeight: 700, fontSize: "1rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  width: "100%", letterSpacing: "0.05em",
                  transition: "background 0.2s",
                }}
              >
                {loading ? "Envoi en cours..." : "Confirmer la réservation"}
              </button>

            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h2 style={{ color: "#4ADE80", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Reservation Confirmed !
            </h2>
            <p style={{ color: "#9CA3AF", marginBottom: "0.5rem" }}>Votre numéro :</p>
            <p style={{
              fontFamily: "monospace", fontSize: "1.6rem",
              color: "#FBBF24", fontWeight: 700,
              marginBottom: "2rem", letterSpacing: "0.1em",
            }}>
              {reservationNumber}
            </p>
            <p style={{ color: "#9CA3AF", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              Save this number — you'll need it on the day.
            </p>
            <button onClick={onClose} style={{
              background: "#FBBF24", color: "#000", border: "none",
              padding: "0.85rem 2rem", borderRadius: "10px",
              fontWeight: 700, cursor: "pointer", fontSize: "1rem",
            }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}