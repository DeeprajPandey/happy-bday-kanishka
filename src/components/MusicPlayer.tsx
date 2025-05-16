import React, { useEffect, useRef, useState } from 'react';
import { Music, X } from 'lucide-react';
import { YOUTUBE_MUSIC_ID, YOUTUBE_MUSIC_URL, YOUTUBE_TITLE } from '../data/config';

interface MusicPlayerProps {
  muted: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ muted }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [userConsented, setUserConsented] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle user consent
  const handleConsent = (consent: boolean) => {
    setUserConsented(consent);
    setShowConsentModal(false);
    if (consent && !muted) {
      setIsPlaying(true);
    }
  };

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!userConsented || !playerRef.current) return;

      const iframe = playerRef.current.querySelector('iframe');
      if (!iframe) return;

      if (document.hidden) {
        // Page is hidden, pause the music
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        setIsPlaying(false);
      } else {
        // Page is visible, resume if not muted
        if (!muted) {
          iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          setIsPlaying(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [muted, userConsented]);

  // Create YouTube iframe with audio-only parameters
  useEffect(() => {
    if (!playerRef.current || !userConsented) return;

    // Create iframe with audio-only parameters
    const youtubeUrl = `https://www.youtube.com/embed/${YOUTUBE_MUSIC_ID}?enablejsapi=1&autoplay=1&controls=0&loop=1&playlist=${YOUTUBE_MUSIC_ID}&playsinline=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3`;

    playerRef.current.innerHTML = `
      <iframe
        width="1"
        height="1"
        src="${youtubeUrl}"
        title="${YOUTUBE_TITLE}"
        allow="autoplay"
        style="position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px; opacity: 0;"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    `;

    const iframe = playerRef.current.querySelector('iframe');
    if (!iframe) return;

    // Wait for iframe to load before sending commands
    iframe.onload = () => {
      if (muted || document.hidden) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        setIsPlaying(false);
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        setIsPlaying(true);
      }
    };
  }, [userConsented]);

  // Handle mute/unmute
  useEffect(() => {
    if (!playerRef.current || !userConsented) return;

    const iframe = playerRef.current.querySelector('iframe');
    if (!iframe) return;

    if (muted || document.hidden) {
      iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      setIsPlaying(false);
    } else {
      iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      setIsPlaying(true);
    }
  }, [muted, userConsented]);

  return (
    <>
      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music className="text-pink-600" size={24} />
                <h3 className="text-lg font-semibold">Background Music</h3>
              </div>
              <button
                onClick={() => handleConsent(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Would you like to play some background music while browsing your birthday site?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleConsent(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                No thanks
              </button>
              <button
                onClick={() => handleConsent(true)}
                className="px-4 py-2 bg-pink-600 text-white hover:bg-pink-700 rounded-lg transition-colors"
              >
                Yes, play music
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden iframe for audio playback */}
      <div ref={playerRef} className="hidden"></div>

      {/* Music indicator - only show if user consented */}
      {userConsented && (
        <div className={`fixed top-20 left-4 p-3 rounded-full bg-white/70 shadow-md ${muted || !isPlaying ? 'opacity-50' : 'animate-pulse'
          }`}>
          <Music size={20} className="text-pink-600" />
        </div>
      )}
    </>
  );
};

export default MusicPlayer;

