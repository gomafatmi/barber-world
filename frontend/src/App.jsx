import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import ReservationFormOverlay from "./components/sections/ReservationFormOverlay"

gsap.registerPlugin(ScrollTrigger)
window.gsap = gsap
window.ScrollTrigger = ScrollTrigger

export default function App() {
  const [modal, setModal] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap"
    document.head.appendChild(link)
  }, [])

  const openModal = (service = "Classic Cut") => setModal(service)
  const closeModal = () => setModal(null)

  return (
    <BrowserRouter>
      <div style={{ background: "#000", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #000; }
          ::selection { background: #FBBF24; color: #000; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb { background: #FBBF24; border-radius: 3px; }
        `}</style>

        <Routes>
          <Route path="/" element={
            <>
              <Home onBook={openModal} isMobile={isMobile} />
              {modal !== null && (
                <ReservationFormOverlay service={modal} onClose={closeModal} isMobile={isMobile} />
              )}
            </>
          } />
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}