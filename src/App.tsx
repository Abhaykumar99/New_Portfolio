import HeroSection from './components/HeroSection';
import Stats from './components/Stats';
import Skills from './components/Skills';
import DemoOne from './components/demo';
import CustomCursor from './components/CustomCursor';
import FeaturedProjects from './components/FeaturedProjects';
import Qualifications from './components/Qualifications';
import Experiences from './components/Experiences';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { useTheme } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);
  const { vibe } = useTheme();

  const getThemeClasses = () => {
    switch (vibe) {
      case 'light': return 'bg-gray-100 text-black selection:bg-black selection:text-white';
      case 'dark':
      default: return 'bg-black text-white selection:bg-white selection:text-black';
    }
  };

  return (
    <div className={`${getThemeClasses()} min-h-screen transition-colors duration-500`}>
      <CustomCursor />

      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Navbar />
        <HeroSection />
        <Stats />
        <Skills />
        <FeaturedProjects />
        <DemoOne />
        <Qualifications />
        <Experiences />
        <Achievements />
        <Footer />
      </div>
    </div>
  );
}

export default App;
