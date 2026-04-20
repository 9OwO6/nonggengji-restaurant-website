import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import About from './components/About';
import MenuHighlights from './components/MenuHighlights';
import GoogleReviews from './components/GoogleReviews';
import WaitlistSection from './components/WaitlistSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurStory />
      <About />
      <MenuHighlights />
      <GoogleReviews />
      <WaitlistSection />
      <Footer />
    </>
  );
}
