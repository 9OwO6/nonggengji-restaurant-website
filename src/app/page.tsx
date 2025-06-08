import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuHighlights from './components/MenuHighlights';
import Media from './components/Media';
import GoogleReviews from './components/GoogleReviews';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <MenuHighlights />
      <Media />
      <GoogleReviews />
      <Footer />
    </>
  );
}
