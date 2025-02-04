"use client";

import { LuPlay } from 'react-icons/lu';

interface VideoThumbnailProps {
  videoSrc?: string;
  thumbnailSrc: string;
  isPlaying: boolean;
  onPlay: () => void;
  width?: number;
  height?: number;
}

const VideoThumbnail = ({
  videoSrc,
  thumbnailSrc,
  isPlaying,
  onPlay,
  width = 1280,
  height = 720
}: VideoThumbnailProps) => {
  return (
    <div className="relative w-full h-full bg-black">
      {thumbnailSrc ? (
        <img
          src={thumbnailSrc}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
          width={width}
          height={height}
        />
      ) : (
        <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
          <span className="text-white/60">No thumbnail available</span>
        </div>
      )}
      
      {!isPlaying && (
        <button
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <LuPlay className="w-8 h-8 text-white fill-white" />
          </div>
        </button>
      )}
    </div>
  );
};

export default VideoThumbnail;
