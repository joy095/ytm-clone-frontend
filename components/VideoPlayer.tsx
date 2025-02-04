/** @format */

"use client";

import { useState, useCallback, useEffect } from "react";
import { Video } from "@/types/video";
import VideoThumbnail from "./VideoThumbnail";
import VideoPlayerControls from "./VideoPlayerControls";
import PlaylistItem from "./PlaylistItem";

interface VideoPlayerProps {
  playlist: Video[];
  initialVideoIndex?: number;
  onPlaylistChange?: (currentVideo: Video) => void;
}

const VideoPlayer = ({
  playlist,
  initialVideoIndex = 0,
  onPlaylistChange,
}: VideoPlayerProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const currentVideo = playlist[currentVideoIndex];

  useEffect(() => {
    if (onPlaylistChange && currentVideo) {
      onPlaylistChange(currentVideo);
    }
  }, [currentVideo, onPlaylistChange]);

  const handlePrevious = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? playlist.length - 1 : newIndex;
    });
    setCurrentTime(0);
  }, [playlist.length]);

  const handleNext = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= playlist.length ? 0 : newIndex;
    });
    setCurrentTime(0);
  }, [playlist.length]);

  const handleSeek = useCallback(
    (time: number) => {
      setCurrentTime(Math.min(Math.max(0, time), currentVideo.duration));
    },
    [currentVideo.duration]
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-black">
      <div className="relative aspect-video bg-neutral-900">
        <VideoThumbnail
          videoSrc={currentVideo.videoSrc}
          thumbnailSrc={currentVideo.thumbnail}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
        />
      </div>

      <VideoPlayerControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        currentTime={currentTime}
        duration={currentVideo.duration}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onMute={() => setIsMuted(!isMuted)}
        onSeek={handleSeek}
        onTogglePlaylist={() => setShowPlaylist(!showPlaylist)}
        onToggleSettings={() => setShowSettings(!showSettings)}
      />

      {showPlaylist && (
        <div className="bg-neutral-900 border-t border-neutral-800 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Up Next</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">Auto-play</span>
              <button
                className="w-10 h-6 bg-blue-600 rounded-full relative"
                onClick={() => setAutoPlay(!autoPlay)}
                aria-label={autoPlay ? "Disable autoplay" : "Enable autoplay"}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                    autoPlay ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {playlist.map(
              (video, index) =>
                index !== currentVideoIndex && (
                  <PlaylistItem
                    key={video.id}
                    video={video}
                    onClick={() => {
                      setCurrentVideoIndex(index);
                      setCurrentTime(0);
                      setIsPlaying(true);
                    }}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
