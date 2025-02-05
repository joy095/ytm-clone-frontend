/** @format */

"use client";

import Image from "next/image";
import React, { useState, useCallback } from "react";
import ReactPlayer from "react-player";
import {
  LuPlay,
  LuPause,
  LuSkipBack,
  LuSkipForward,
  LuVolume2,
  LuVolumeX,
  LuSettings,
  LuListVideo,
} from "react-icons/lu";

const VideoPlayerController = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const playlist = [
    {
      id: 1,
      title: "Promise",
      artist: "Choi Yu Ree",
      views: "5.5M views",
      likes: "31K likes",
      duration: 237,
      url: "/video.mp4",
    },
    {
      id: 2,
      title: "Tell Me It's Not a Dream",
      artist: "10CM",
      duration: 236,
      url: "https://res.cloudinary.com/demo/video/upload/dog.mp4",
    },
    {
      id: 3,
      title: "Hold Me Back",
      artist: "헤이즈",
      duration: 233,
      url: "https://res.cloudinary.com/demo/video/upload/bunny.mp4",
    },
  ];

  const currentVideo = playlist[currentVideoIndex];

  const handlePrevious = useCallback(() => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
    setCurrentTime(0);
  }, [playlist.length]);

  const handleNext = useCallback(() => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === playlist.length - 1 ? 0 : prevIndex + 1
    );
    setCurrentTime(0);
  }, [playlist.length]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-[calc(100vw-15rem)] h-screen">
      <div className="md:flex h-[calc(100vh-64px)] w-full">
        <div className="flex-1 md:flex">
          <div className="md:flex-1">
            <div className="relative aspect-video bg-black">
              <ReactPlayer
                url={currentVideo.url}
                playing={isPlaying}
                muted={isMuted}
                width="100%"
                height="100%"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onProgress={({ playedSeconds }) =>
                  setCurrentTime(playedSeconds)
                }
              />
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                >
                  <LuPlay className="w-16 h-16 text-white" />
                </button>
              )}
            </div>

            <div className="hidden md:block p-4 text-white">
              <h2 className="text-2xl font-medium mb-2">
                {currentVideo.title}
              </h2>
              <div className="flex items-center gap-2 text-neutral-400">
                <span>{currentVideo.artist}</span>
                <span>•</span>
                <span>{currentVideo.views}</span>
                <span>•</span>
                <span>{currentVideo.likes}</span>
              </div>
            </div>
          </div>

          {/* Up Next Section */}
          <div className="hidden md:block w-96">
            <div className="p-4">
              <span className="text-white font-medium">UP NEXT</span>
              <div className="space-y-2">
                {playlist.map((video, index) => (
                  <div
                    key={video.id}
                    onClick={() => {
                      setCurrentVideoIndex(index);
                      setCurrentTime(0);
                    }}
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                      currentVideoIndex === index
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <Image
                      src="/api/placeholder/320/180"
                      alt={video.title}
                      height={80}
                      width={128}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium line-clamp-1">{video.title}</p>
                      <p className="text-sm text-white/60">{video.artist}</p>
                      <p className="text-sm text-white/60">
                        {formatTime(video.duration)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden p-2 text-white">
            <div className="mb-2">
              <div className="h-1 bg-neutral-700 rounded-full">
                <div
                  className="h-full bg-white rounded-full"
                  style={{
                    width: `${(currentTime / currentVideo.duration) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button onClick={handlePrevious}>
                <LuSkipBack className="w-6 h-6" />
              </button>
              <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <LuPause className="w-6 h-6" />
                ) : (
                  <LuPlay className="w-6 h-6" />
                )}
              </button>
              <button onClick={handleNext}>
                <LuSkipForward className="w-6 h-6" />
              </button>
              <button onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? (
                  <LuVolumeX className="w-6 h-6" />
                ) : (
                  <LuVolume2 className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerController;
