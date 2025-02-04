"use client";

import { LuPlay, LuPause, LuSkipBack, LuSkipForward, LuVolume2, LuVolumeX, LuSettings, LuListVideo } from 'react-icons/lu';
import { formatTime } from '@/utils/format';
import ProgressBar from './ProgressBar';

interface VideoPlayerControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onMute: () => void;
  onSeek?: (time: number) => void;
  onTogglePlaylist?: () => void;
  onToggleSettings?: () => void;
}

const VideoPlayerControls = ({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  onPlayPause,
  onPrevious,
  onNext,
  onMute,
  onSeek,
  onTogglePlaylist,
  onToggleSettings,
}: VideoPlayerControlsProps) => {
  return (
    <div className="bg-neutral-900 p-4 text-white">
      <div className="mb-4">
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={onSeek}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onPrevious}
            className="hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="Previous track"
          >
            <LuSkipBack className="w-6 h-6" />
          </button>
          
          <button
            onClick={onPlayPause}
            className="hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <LuPause className="w-6 h-6" /> : <LuPlay className="w-6 h-6" />}
          </button>
          
          <button
            onClick={onNext}
            className="hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="Next track"
          >
            <LuSkipForward className="w-6 h-6" />
          </button>
          
          <button
            onClick={onMute}
            className="hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <LuVolumeX className="w-6 h-6" /> : <LuVolume2 className="w-6 h-6" />}
          </button>
          
          <span className="text-sm" role="timer">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onTogglePlaylist}
            className="hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="Toggle playlist"
          >
            <LuListVideo className="w-6 h-6" />
          </button>
          <button 
            onClick={onToggleSettings}
            className="hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="Settings"
          >
            <LuSettings className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerControls;
