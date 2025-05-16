import { useState, useEffect } from 'react';
import { Cake, Gift, PartyPopper as Party, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import Hero from './components/Hero';
import PhotoCollage from './components/PhotoCollage';
import Timeline from './components/Timeline';
import FloatingElements from './components/FloatingElements';
import ConfettiButton from './components/ConfettiButton';
import MusicPlayer from './components/MusicPlayer';
import { BIRTHDAY_PERSON } from './data/config';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [muted, setMuted] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading sequence
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Add sparkle effect to cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (!partyMode) return;

      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${e.pageX}px`;
      sparkle.style.top = `${e.pageY}px`;
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [partyMode]);

  const togglePartyMode = () => {
    setPartyMode(!partyMode);
  };

  const toggleMuted = () => {
    setMuted(!muted);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${darkMode
      ? 'bg-gradient dark:from-purple-900 dark:via-pink-900 dark:to-indigo-900 text-gray-100'
      : 'bg-gradient from-pink-300 via-orange-200 to-yellow-200 text-gray-900'
      } ${partyMode ? 'party-mode' : ''}`}>
      <div className={`opacity-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : ''}`}>
        <header className={`sticky top-0 z-50 px-4 py-3 backdrop-blur-sm ${darkMode ? 'bg-gray-900/30' : 'bg-white/30'
          } flex justify-between items-center shadow-sm`}>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-pink-300' : 'text-pink-800'}`}>
            <Cake className="inline-block mr-2" size={24} />
            Happy Birthday {BIRTHDAY_PERSON}!
          </h2>
          <div className="flex gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${darkMode
                ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
                : 'bg-white/50 hover:bg-white/80'
                }`}
              aria-label={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMuted}
              className={`p-2 rounded-full transition-colors ${darkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-white/50 hover:bg-white/80'
                }`}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={togglePartyMode}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${partyMode
                ? 'bg-purple-500 text-white'
                : darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white/50 hover:bg-white/80'
                }`}
            >
              <Party size={20} />
              <span className="hidden sm:inline">Party Mode</span>
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Hero partyMode={partyMode} />
          <PhotoCollage partyMode={partyMode} />
          <Timeline partyMode={partyMode} />
        </main>

        <FloatingElements partyMode={partyMode} />
        <ConfettiButton />
        <MusicPlayer muted={muted} />

        <footer className={`text-center py-8 ${darkMode ? 'text-pink-300' : 'text-pink-800'}`}>
          <p className="flex justify-center items-center gap-2">
            <Gift size={20} />
            <span>(C) 1998</span>
            <br />
            <span>Made with &#9829; for {BIRTHDAY_PERSON}'s special day!</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
