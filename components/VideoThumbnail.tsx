/** @format */
import { useEffect, useRef } from "react";
import Image from "next/image";

interface VideoThumbnailProps {
  videoSrc: string;
  thumbnailSrc?: string;
  width?: number;
  height?: number;
  className?: string;
  isPlaying: boolean;
  onPlay: () => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoSrc,
  thumbnailSrc,
  width = 260,
  height = 146,
  className,
  isPlaying,
  onPlay,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play().catch((error) => console.error("Error playing video:", error));
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset only if the element exists
    }
  }, [isPlaying]);

  return (
    <div className={`relative ${className}`} onClick={onPlay} style={{ height: height, width: width}}>
      {isPlaying ? (
        <video
          ref={videoRef}
          src={videoSrc}
          width={width}
          height={height}
          className="w-full h-full rounded object-cover"
          muted
        />
      ) : (
        <Image
          src={thumbnailSrc!}
          alt="Video Thumbnail"
          width={width}
          height={height}
          className="w-full h-full object-cover rounded cursor-pointer"
        />
      )}
    </div>
  );
};

export default VideoThumbnail;
