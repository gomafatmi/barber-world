import mongoose from "mongoose"

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Le téléphone est obligatoire"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Le service est obligatoire"],
      enum: ["Classic Cut", "Beard Trim", "Modern Style"],
    },
    date: {
      type: Date,
      required: [true, "La date est obligatoire"],
    },
    time: {
      type: String,
      required: [true, "L'heure est obligatoire"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    reservationNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
)

// Génère le numéro de réservation automatiquement
reservationSchema.pre("save", function (next) {
  if (!this.reservationNumber) {
    this.reservationNumber = "BW-" + Math.floor(100000 + Math.random() * 900000)
  }
  next()
})

export default mongoose.model("Reservation", reservationSchema)