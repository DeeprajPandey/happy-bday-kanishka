import React, { useEffect, useRef } from 'react';
import { Music } from 'lucide-react';
import { YOUTUBE_MUSIC_URL, YOUTUBE_TITLE } from '../data/config';

interface MusicPlayerProps {
  muted: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ muted }) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    const youtubeUrl = `${YOUTUBE_MUSIC_URL}?enablejsapi=1&autoplay=1&controls=0`;

    playerRef.current.innerHTML = `
      <iframe
        width="0"
        height="0"
        src="${youtubeUrl}"
        title="${YOUTUBE_TITLE}"
        allow="autoplay"
        style="border: none;"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    `;

    const iframe = playerRef.current.querySelector('iframe');
    if (!iframe) return;

    if (muted) {
      iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    } else {
      iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  }, [muted]);

  return (
    <>
      <div ref={playerRef} className="hidden"></div>
      <div className={`fixed top-20 left-4 p-3 rounded-full bg-white/70 shadow-md ${muted ? 'opacity-50' : 'animate-pulse'
        }`}>
        <Music size={20} className="text-pink-600" />
      </div>
    </>
  );
};

export default MusicPlayer;
