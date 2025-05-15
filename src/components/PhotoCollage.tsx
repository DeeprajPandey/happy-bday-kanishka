import React, { useState, useEffect } from 'react';
import { COLLAGE_PHOTOS } from '../data/config';

interface PhotoCollageProps {
  partyMode: boolean;
}

const PhotoCollage: React.FC<PhotoCollageProps> = ({ partyMode }) => {
  const [rotations, setRotations] = useState<string[]>([]);
  
  // Initialize with random rotations
  useEffect(() => {
    const initialRotations = COLLAGE_PHOTOS.map(photo => photo.rotation);
    setRotations(initialRotations);
  }, []);

  // Shuffle photos periodically in party mode
  useEffect(() => {
    if (!partyMode) return;
    
    const interval = setInterval(() => {
      shufflePhotos();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [partyMode]);

  const shufflePhotos = () => {
    setRotations(prev => 
      prev.map(() => `${Math.floor(Math.random() * 41 - 20)}deg`)
    );
  };

  return (
    <section className="my-16 relative" id="collage">
      <h2 className="text-3xl font-bold text-center mb-12 text-pink-800">Memory Collage</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {COLLAGE_PHOTOS.map((photo, index) => (
          <div
            key={photo.id}
            className="polaroid transform transition-all duration-300 mx-auto"
            style={{ 
              transform: `rotate(${rotations[index] || photo.rotation})`,
              transitionDelay: `${index * 0.1}s`
            }}
          >
            <div className="overflow-hidden">
              <img
                src={photo.url}
                alt={`Memory ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
            <p className="text-center mt-4 font-handwriting text-gray-700">
              {photo.caption}
            </p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button 
          onClick={shufflePhotos}
          className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
        >
          Shuffle Photos
        </button>
      </div>
    </section>
  );
};

export default PhotoCollage;