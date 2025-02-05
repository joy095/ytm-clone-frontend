/** @format */

"use client";

import React from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

interface PlayerProps {
  url: string;
  playing: boolean;
  muted: boolean;
  onPlay: () => void;
  onPause: () => void;
  onProgress: (state: { playedSeconds: number }) => void;
  onEnded: () => void;
}

export const Player = ({
  url,
  playing,
  muted,
  onPlay,
  onPause,
  onProgress,
  onEnded,
}: PlayerProps) => {
  return (
    <ReactPlayer
      url={url}
      playing={playing}
      muted={muted}
      width="100%"
      height="100%"
      controls={false}
      onPlay={onPlay}
      onPause={onPause}
      onProgress={onProgress}
      onEnded={onEnded} // Detect when video ends
    />
  );
};
