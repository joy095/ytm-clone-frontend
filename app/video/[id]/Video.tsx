/** @format */

"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Player } from "@/components/VideoPlayer";
import {
  LuPlay,
  LuPause,
  LuSkipBack,
  LuSkipForward,
  LuVolume2,
  LuVolumeX,
  LuListVideo,
} from "react-icons/lu";

const VideoPlayerController = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const playlist = [
    {
      id: 1,
      title: "Promise",
      artist: "Choi Yu Ree",
      views: "5.5M views",
      likes: "31K likes",
      duration: 237,
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: 2,
      title: "Tell Me It's Not a Dream",
      artist: "10CM",
      duration: 236,
      url: "https://res.cloudinary.com/demo/video/upload/dog.mp4",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: 3,
      title: "Hold Me Back",
      artist: "헤이즈",
      duration: 233,
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnail: "/api/placeholder/320/180",
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
        {/* Video Section */}
        <div className="flex-1">
          <div className="relative aspect-video bg-black">
            <button onClick={() => setIsPlaying((prevState) => !prevState)}>
              <Player
                url={currentVideo.url}
                playing={isPlaying}
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onProgress={({ playedSeconds }) =>
                  setCurrentTime(playedSeconds)
                }
                onEnded={handleNext} // Play next video when current one ends
              />
            </button>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center justify-between p-4 bg-neutral-900 text-white">
            <div className="flex items-center gap-4">
              <button onClick={handlePrevious}>
                <LuSkipBack className="w-6 h-6" />
              </button>

              <button onClick={() => setIsPlaying((prevState) => !prevState)}>
                {isPlaying ? (
                  <LuPause className="w-6 h-16 text-white" />
                ) : (
                  <LuPlay className="w-6 h-16 text-white" />
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
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(currentVideo.duration)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:bg-white/10 p-2 rounded-full">
                <LuListVideo className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Playlist (Desktop) */}
        <div className="hidden md:block w-96 bg-neutral-800 p-4 text-white">
          <h3 className="font-medium mb-4">Up Next</h3>
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
                  src={video.thumbnail}
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-900 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setShowPlaylist(!showPlaylist)}>
            <LuListVideo className="w-6 h-6" />
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <LuPause className="w-6 h-6" />
            ) : (
              <LuPlay className="w-6 h-6" />
            )}
          </button>
          <button onClick={() => setAutoPlay(!autoPlay)}>
            {autoPlay ? "AutoPlay On" : "AutoPlay Off"}
          </button>
        </div>

        <div className="h-1 bg-neutral-700 rounded-full mb-2">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${(currentTime / currentVideo.duration) * 100}%` }}
          />
        </div>

        {showPlaylist && (
          <div className="mt-4 bg-neutral-800 p-4 rounded-md">
            <h4 className="font-medium mb-2">Playlist</h4>
            {playlist.map((video, index) => (
              <div
                key={video.id}
                onClick={() => {
                  setCurrentVideoIndex(index);
                  setCurrentTime(0);
                  setShowPlaylist(false);
                }}
                className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-white/5"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  height={60}
                  width={90}
                  className="w-20 h-12 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-white/60">{video.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerController;
