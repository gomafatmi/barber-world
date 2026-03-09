import Navbar from "../components/layout/Navbar"
import Hero from "../components/sections/Hero"
import Services from "../components/sections/Services"
import GallerySlider from "../components/sections/GallerySlider"
import Contact from "../components/sections/Contact"
import Footer from "../components/layout/Footer"

export default function Home({ onBook, isMobile }) {
  return (
    <>
      <Navbar isMobile={isMobile} />
      <Hero onBook={onBook} isMobile={isMobile} />
      <section id="services"><Services onBook={onBook} isMobile={isMobile} /></section>
      <section id="galerie"><GallerySlider isMobile={isMobile} /></section>
      <section id="contact"><Contact isMobile={isMobile} /></section>
      <Footer isMobile={isMobile} />
    </>
  )
}