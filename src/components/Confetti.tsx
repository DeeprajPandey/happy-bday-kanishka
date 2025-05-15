import React, { useEffect } from 'react';

const Confetti: React.FC = () => {
  useEffect(() => {
    const createConfetti = () => {
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '100';
      document.body.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const confettiCount = 300;
      const confettiColors = ['#f87171', '#60a5fa', '#a78bfa', '#4ade80', '#facc15', '#fb923c'];
      const confettiPieces: any[] = [];
      
      // Initialize confetti pieces
      for (let i = 0; i < confettiCount; i++) {
        const piece = {
          x: canvas.width / 2,
          y: canvas.height / 2,
          size: Math.random() * 10 + 5,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          speedX: Math.random() * 10 - 5,
          speedY: Math.random() * -10 - 5,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 10 - 5
        };
        confettiPieces.push(piece);
      }
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let stillActive = false;
        
        confettiPieces.forEach(piece => {
          piece.x += piece.speedX;
          piece.y += piece.speedY;
          piece.speedY += 0.1; // Gravity
          piece.rotation += piece.rotationSpeed;
          
          // Draw confetti piece
          ctx.save();
          ctx.translate(piece.x, piece.y);
          ctx.rotate((piece.rotation * Math.PI) / 180);
          ctx.fillStyle = piece.color;
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
          ctx.restore();
          
          // Check if any pieces are still in view
          if (piece.y < canvas.height + piece.size) {
            stillActive = true;
          }
        });
        
        if (stillActive) {
          requestAnimationFrame(animate);
        } else {
          canvas.remove();
        }
      };
      
      animate();
      
      // Cleanup when component unmounts
      return () => {
        canvas.remove();
      };
    };
    
    createConfetti();
  }, []);
  
  return null;
};

export default Confetti;