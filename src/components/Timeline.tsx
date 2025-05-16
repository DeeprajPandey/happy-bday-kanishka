import React, { useRef, useEffect } from 'react';
import { TIMELINE_PHOTOS } from '../data/config';

interface TimelineProps {
  partyMode: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ partyMode }) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    const timeline = timelineRef.current;
    if (timeline) {
      observer.observe(timeline);
    }

    return () => {
      if (timeline) {
        observer.unobserve(timeline);
      }
    };
  }, []);

  return (
    <section className="my-16 md:my-24" id="timeline">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-16 text-pink-800 px-4">Our Journey</h2>

      <div
        ref={timelineRef}
        className="relative max-w-5xl mx-auto px-4"
      >
        {/* Timeline line - hidden on mobile, visible on desktop */}
        <div className="hidden md:block timeline-line w-[90%] mx-auto"></div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-12">
          {TIMELINE_PHOTOS.map((photo, index) => (
            <div key={photo.id} className="timeline-photo relative">
              {/* Vertical timeline line for mobile */}
              {index < TIMELINE_PHOTOS.length - 1 && (
                <div className="absolute left-6 top-0 w-0.5 h-full bg-pink-200 z-0"></div>
              )}

              <div className="flex items-start gap-4">
                {/* Timeline dot for mobile */}
                <div className="timeline-dot mt-8 flex-shrink-0"></div>

                {/* Content */}
                <div className="flex-1">
                  <div className="polaroid" style={{ maxWidth: '100%' }}>
                    <img
                      src={photo.url}
                      alt={`Year ${photo.year}`}
                      className="w-full object-contain"
                      style={{ maxHeight: '400px' }}
                    />
                    <div className="pt-2">
                      <span className="block text-center font-bold text-pink-600 text-lg">
                        {photo.year}
                      </span>
                      <p className="text-center mt-2 font-handwriting text-gray-700 text-sm sm:text-base">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-row justify-between items-start gap-8">
          {TIMELINE_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              className={`timeline-photo relative flex-1 ${index % 2 === 0 ? 'md:mt-20' : ''}`}
            >
              <div className="polaroid mx-auto" style={{ maxWidth: '280px' }}>
                <img
                  src={photo.url}
                  alt={`Year ${photo.year}`}
                  className="w-full h-48 object-cover"
                />
                <div className="pt-2">
                  <span className="block text-center font-bold text-pink-600">{photo.year}</span>
                  <p className="text-center mt-2 font-handwriting text-gray-700">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Timeline dots for desktop */}
              <div className="timeline-dot left-1/2 -ml-2"></div>

              {/* Doodle connectors (only visible in party mode) */}
              {partyMode && index < TIMELINE_PHOTOS.length - 1 && (
                <div className="absolute top-24 right-[-30%] w-[60%] h-16 z-10">
                  <svg width="100%" height="100%" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10,25 C40,5 60,45 100,25 C140,5 160,45 190,25"
                      stroke="#F472B6"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="1,0"
                    />
                    {/* Hearts and stars */}
                    <circle cx="50" cy="15" r="5" fill="#F472B6" />
                    <circle cx="150" cy="15" r="5" fill="#F472B6" />
                    <path d="M100,35 L105,25 L100,15 L95,25 Z" fill="#FFD700" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

