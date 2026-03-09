import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api",
})

export const createReservation = async (data) => {
  const response = await API.post("/reservations", data)
  return response.data
}

export const getReservations = async () => {
  const response = await API.get("/reservations")
  return response.data
}