"use client";

import { Video } from '@/types/video';
import { formatTime } from '@/utils/format';
import Image from 'next/image';

interface PlaylistItemProps {
  video: Video;
  onClick: () => void;
}

const PlaylistItem = ({ video, onClick }: PlaylistItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 text-white/80 hover:bg-white/5 p-2 rounded cursor-pointer transition-colors"
    >
      <div className="relative w-32 h-20 flex-shrink-0">
        <Image
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover rounded"
          width={128}
          height={80}
        />
        <span className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-xs">
          {formatTime(video.duration)}
        </span>
      </div>
      <div className="flex-grow min-w-0">
        <p className="font-medium truncate">{video.title}</p>
        <p className="text-sm text-white/60 truncate">{video.artist}</p>
      </div>
    </div>
  );
};

export default PlaylistItem;