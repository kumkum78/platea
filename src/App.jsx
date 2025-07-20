
import Header from './components/Header';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Discover from './components/Discover';
import NewRecipe from './components/NewRecipe';
import Vedios from './components/Vedios';
import OurJournal from './components/OurJournal';

export default function App() {
  return (
    <div className="bg-white font-sans text-gray-700">
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Discover />
        <NewRecipe />
        <Vedios />
        <AboutUs />
        <OurJournal />
      </main>
      <Footer />
    </div>
  );
}

