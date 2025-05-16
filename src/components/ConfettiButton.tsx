import React, { useState } from 'react';
import { Cake } from 'lucide-react';
import Confetti from './Confetti';

const ConfettiButton: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [cakeClicked, setCakeClicked] = useState(false);

  const handleClick = () => {
    setShowConfetti(true);
    setCakeClicked(true);

    // Play sound effect
    const audio = new Audio('/happy-bday-kanishka/sounds/confetti-pop.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));

    // Reset after animation
    setTimeout(() => {
      setShowConfetti(false);
      setTimeout(() => setCakeClicked(false), 1000);
    }, 3000);
  };

  return (
    <>
      {showConfetti && <Confetti />}

      <button
        onClick={handleClick}
        className={`birthday-cake transition-transform duration-300 ${cakeClicked ? 'scale-150 rotate-[360deg]' : ''
          }`}
        aria-label="Celebrate with confetti"
      >
        <Cake
          size={32}
          className="text-pink-500"
        />
      </button>
    </>
  );
};

export default ConfettiButton;
