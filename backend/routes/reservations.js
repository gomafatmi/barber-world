import express from "express"
import {
  createReservation,
  getReservations,
  getReservation,
  deleteReservation,
} from "../controllers/reservationController.js"

const router = express.Router()

router.route("/")
  .get(getReservations)
  .post(createReservation)

router.route("/:id")
  .get(getReservation)
  .delete(deleteReservation)

export default router