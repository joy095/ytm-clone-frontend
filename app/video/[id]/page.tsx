/** @format */

"use client";

import Image from "next/image";
import React, { useState, useCallback } from "react";
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

const VideoLuPlayerController = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLuPlaying, setIsLuPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Sample LuPlaylist data - in real app, this would likely be passed as props
  const LuPlaylist = [
    {
      id: 1,
      title: "Memory Reboot (Slowed)",
      artist: "Narvent and VØJ",
      duration: 237, // 3:57 in seconds
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: 2,
      title: "Distant Echoes (slowed + reverb)",
      artist: "Narvent and VXLLAIN",
      duration: 184, // 3:04 in seconds
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: 3,
      title: "Strangers",
      artist: "Kenya Grace",
      duration: 174, // 2:54 in seconds
      thumbnail: "/api/placeholder/320/180",
    },
  ];

  const currentVideo = LuPlaylist[currentVideoIndex];

  const handlePrevious = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? LuPlaylist.length - 1 : newIndex;
    });
    setCurrentTime(0);
  }, [LuPlaylist.length]);

  const handleNext = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= LuPlaylist.length ? 0 : newIndex;
    });
    setCurrentTime(0);
  }, [LuPlaylist.length]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black">
      {/* Video Container */}
      <div className="relative aspect-video bg-neutral-900">
        <div className="absolute inset-0 flex items-center justify-center">
          {!isLuPlaying && (
            <button
              onClick={() => setIsLuPlaying(true)}
              className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <LuPlay className="w-8 h-8 text-white fill-white" />
            </button>
          )}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-neutral-900 p-4 text-white">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-1 bg-neutral-700 rounded-full">
            <div
              className="h-full bg-white rounded-full"
              style={{
                width: `${(currentTime / currentVideo.duration) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevious}
              className="hover:bg-white/10 p-2 rounded-full"
            >
              <LuSkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsLuPlaying(!isLuPlaying)}
              className="hover:bg-white/10 p-2 rounded-full"
            >
              {isLuPlaying ? (
                <LuPause className="w-6 h-6" />
              ) : (
                <LuPlay className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="hover:bg-white/10 p-2 rounded-full"
            >
              <LuSkipForward className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="hover:bg-white/10 p-2 rounded-full"
            >
              {isMuted ? (
                <LuVolumeX className="w-6 h-6" />
              ) : (
                <LuVolume2 className="w-6 h-6" />
              )}
            </button>

            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(currentVideo.duration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="hover:bg-white/10 p-2 rounded-full">
              <LuListVideo className="w-6 h-6" />
            </button>
            <button className="hover:bg-white/10 p-2 rounded-full">
              <LuSettings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Up Next Section */}
      <div className="bg-neutral-900 border-t border-neutral-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium">Up Next</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">Auto-LuPlay</span>
            <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {LuPlaylist.map(
            (video, index) =>
              index !== currentVideoIndex && (
                <div
                  key={video.id}
                  onClick={() => {
                    setCurrentVideoIndex(index);
                    setCurrentTime(0);
                  }}
                  className="flex items-center gap-3 text-white/80 hover:bg-white/5 p-2 rounded cursor-pointer"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    height={80}
                    width={128}
                    className="w-32 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{video.title}</p>
                    <p className="text-sm text-white/60">{video.artist}</p>
                    <p className="text-sm text-white/60">
                      {formatTime(video.duration)}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoLuPlayerController;
