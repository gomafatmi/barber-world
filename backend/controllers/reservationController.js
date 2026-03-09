import Reservation from "../models/Reservation.js"

// POST /api/reservations — créer une réservation
export const createReservation = async (req, res) => {
  try {
    const { name, phone, email, service, date, time } = req.body

    const reservation = await Reservation.create({
      name,
      phone,
      email,
      service,
      date,
      time,
    })

    res.status(201).json({
      success: true,
      reservationNumber: reservation.reservationNumber,
      data: reservation,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

// GET /api/reservations — liste toutes les réservations
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// GET /api/reservations/:id — une seule réservation
export const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Réservation introuvable",
      })
    }
    res.status(200).json({ success: true, data: reservation })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE /api/reservations/:id — supprimer une réservation
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id)
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Réservation introuvable",
      })
    }
    res.status(200).json({ success: true, message: "Réservation supprimée" })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}