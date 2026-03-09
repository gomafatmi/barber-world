import { setDefaultResultOrder } from "dns"
setDefaultResultOrder("ipv4first")

import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const env = readFileSync(join(__dirname, ".env"), "utf8")
env.split("\n").forEach((line) => {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith("#")) return
  const index = trimmed.indexOf("=")
  if (index === -1) return
  const key = trimmed.substring(0, index).trim()
  const value = trimmed.substring(index + 1).trim()
  if (key) process.env[key] = value
})

console.log("MONGO_URI:", process.env.MONGO_URI)

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import reservationRoutes from "./routes/reservations.js"

const app = express()

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.use("/api/reservations", reservationRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Barber World API is running 💈" })
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connecté")
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("❌ Erreur MongoDB :", err.message)
    process.exit(1)
  })