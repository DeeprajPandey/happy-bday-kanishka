import React, { useState, useEffect } from 'react';
import { HERO_PHOTO, BIRTHDAY_PERSON } from '../data/config';
import Confetti from './Confetti';

interface HeroProps {
  partyMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ partyMode }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [visibleText, setVisibleText] = useState('');
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const fullText = `Happy Birthday ${BIRTHDAY_PERSON}!`;

  // Typewriter effect
  useEffect(() => {
    if (visibleText.length < fullText.length) {
      const timer = setTimeout(() => {
        setVisibleText(fullText.substring(0, visibleText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsFullyVisible(true);
    }
  }, [visibleText, fullText]);

  // Trigger confetti on hero photo click
  const handlePhotoClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center relative mb-24">
      {showConfetti && <Confetti />}

      <h1 className={`text-4xl md:text-6xl lg:text-7xl text-center font-bold mb-8 text-pink-800
        ${isFullyVisible ? 'animate-bounce' : ''}`}>
        {visibleText}
        <span className="animate-pulse">|</span>
      </h1>

      <div
        className="hero-photo max-w-md mx-auto polaroid cursor-pointer"
        onClick={handlePhotoClick}
        style={{ transform: `rotate(${partyMode ? '5deg' : '0deg'})` }}
      >
        <img
          src={HERO_PHOTO.url}
          alt="Birthday Hero"
          className="w-full h-auto"
        />
        <p className="text-center mt-2 font-handwriting text-lg text-gray-700">
          {HERO_PHOTO.caption}
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xl text-pink-800 opacity-0 animate-fadeIn" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
          meow meow.. meowmeow... 🐱
        </p>
        <p className="text-lg text-pink-700 mt-2 opacity-0 animate-fadeIn" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
          Click the photo for a surprise!
        </p>
      </div>
    </section>
  );
};

export default Hero;
