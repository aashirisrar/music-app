"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";

import { Song } from "@/types/route";

interface MediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ song, onClick }) => {
  const imageUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClick) return onClick(song.id);

    // Default turn on player
  };

  return (
    <div
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
      onClick={handleClick}
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || "/images/likes.jpg"}
          alt={song?.id}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{song?.title}</p>
        <p className="text-neutral-400 text-sm truncate">{song?.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
