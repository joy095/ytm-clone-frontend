/** @format */

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import VideoThumbnail from "./VideoThumbnail";

const MusicSlider = () => {
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const scrollContainerRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Love Myself",
      artist: "Hailee Steinfeld",
      views: "332M views",
      img: "/child-8347081_1280.webp",
      video:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 2,
      title: "Jannat",
      artist: "Emraan Hashmi",
      views: "47M views",
      img: "/child-9195259_1280.webp",
      video:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 3,
      title: "Love Myself",
      artist: "Hailee Steinfeld",
      views: "332M views",
      img: "/child-8347081_1280.webp",
      video:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 4,
      title: "Jannat",
      artist: "Emraan Hashmi",
      views: "47M views",
      img: "/child-9195259_1280.webp",
      video:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 5,
      title: "Love Myself",
      artist: "Hailee Steinfeld",
      views: "332M views",
      img: "/child-8347081_1280.webp",
      video:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 6,
      title: "Jannat",
      artist: "Emraan Hashmi",
      views: "47M views",
      img: "/child-9195259_1280.webp",
      video:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 7,
      title: "Love Myself",
      artist: "Hailee Steinfeld",
      views: "332M views",
      img: "/child-8347081_1280.webp",
      video:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 8,
      title: "Jannat",
      artist: "Emraan Hashmi",
      views: "47M views",
      img: "/child-9195259_1280.webp",
      video:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
  ];

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current as HTMLElement;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScroll - 1);
    }
  }, []);

  const scroll = useCallback((direction: "next" | "prev") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current as HTMLElement;
      const scrollAmount = container.clientWidth * 0.8;
      const newScrollPosition =
        direction === "next"
          ? container.scrollLeft + scrollAmount
          : container.scrollLeft - scrollAmount;

      container.scrollTo({ left: newScrollPosition, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      (container as HTMLElement).addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();
      return () =>
        (container as HTMLElement).removeEventListener(
          "scroll",
          checkScrollButtons
        );
    }
  }, [checkScrollButtons]);

  return (
    <div className="w-full text-white">
      <div
        className="relative max-w-[1850px] mx-auto"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Forgotten favourites</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("prev")}
              className="cursor-pointer rounded-full p-2 border border-secondary hover:border-white/20 hover:bg-default transition-colors active:scale-90 scale-100"
              disabled={!canScrollLeft}
            >
              <RxChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("next")}
              className="cursor-pointer rounded-full p-2 border border-secondary hover:border-white/20 hover:bg-default transition-colors active:scale-90 scale-100"
              disabled={!canScrollRight}
            >
              <RxChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth"
        >
          {slides.map((slide) => (
            <div key={slide.id} className="flex-none w-[260px]">
              <div className="group relative aspect-video mb-3 cursor-pointer">
                <VideoThumbnail
                  className="object-cover rounded"
                  height={146}
                  width={260}
                  videoSrc={slide.video}
                  thumbnailSrc={slide.img}
                  isPlaying={playingVideo === slide.id}
                  onPlay={() =>
                    setPlayingVideo(playingVideo === slide.id ? null : slide.id)
                  }
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium truncate">{slide.title}</h3>
                <p className="text-sm text-gray-400 truncate">{slide.artist}</p>
                <p className="text-sm text-gray-400">{slide.views}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicSlider;
