"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";

import { Song } from "@/types/route";

interface SongsItemProps {
  song: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongsItemProps> = ({ song, onClick }) => {
  const imagePath = useLoadImage(song);

  return (
    <div
      onClick={() => onClick(song.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.jpg"}
          fill
          alt="Image"
        />
      </div>
    </div>
  );
};

export default SongItem;
