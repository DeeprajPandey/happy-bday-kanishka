import React, { useEffect, useState } from 'react';

interface FloatingElementsProps {
  partyMode: boolean;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ partyMode }) => {
  const [balloons, setBalloons] = useState<Array<{ id: number; color: string; left: string; delay: string }>>([]);

  useEffect(() => {
    // Create initial balloons
    createBalloons();

    // Add more balloons periodically
    const interval = setInterval(() => {
      if (balloons.length < (partyMode ? 15 : 8)) {
        addBalloon();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [partyMode]);

  const createBalloons = () => {
    const initialCount = partyMode ? 10 : 5;
    const newBalloons = Array.from({ length: initialCount }, (_, i) => createBalloonObject(i));
    setBalloons(newBalloons);
  };

  const addBalloon = () => {
    setBalloons(prev => {
      const newId = prev.length > 0 ? Math.max(...prev.map(b => b.id)) + 1 : 0;
      return [...prev, createBalloonObject(newId)];
    });
  };

  const createBalloonObject = (id: number) => {
    const colors = ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = `${Math.random() * 90 + 5}%`;
    const randomDelay = `${Math.random() * 5}s`;

    return {
      id,
      color: randomColor,
      left: randomLeft,
      delay: randomDelay
    };
  };

  // Background pattern element
  const PatternBackground = () => (
    <div className="fixed inset-0 z-[-2] bg-pattern opacity-20"></div>
  );

  // Animated gradient blobs
  const GradientBlobs = () => (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 opacity-30 blur-3xl animate-float"
        style={{
          top: '20%',
          left: '10%',
          animation: 'float 15s ease-in-out infinite'
        }}
      ></div>
      <div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 opacity-30 blur-3xl animate-float"
        style={{
          top: '60%',
          left: '60%',
          animation: 'float 18s ease-in-out infinite reverse'
        }}
      ></div>
      <div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-300 to-teal-300 opacity-30 blur-3xl animate-float"
        style={{
          top: '30%',
          right: '15%',
          animation: 'float 20s ease-in-out infinite'
        }}
      ></div>
    </div>
  );

  return (
    <>
      <PatternBackground />
      <GradientBlobs />

      {/* Floating balloons */}
      {balloons.map(balloon => (
        <div key={balloon.id}>
          <div
            className={`floating-balloon ${balloon.color}`}
            style={{
              left: balloon.left,
              animationDelay: balloon.delay
            }}
          >
            {/* Balloon string */}
            <div className="balloon-string"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FloatingElements;

