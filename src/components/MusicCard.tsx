import React, { useEffect, useState } from "react";
import { useLanyard } from "use-lanyard";
import "./MusicCard.css";

interface MusicData {
  artist: string;
  art_url: string;
  title: string;
  length: number;
  elapsed: number;
  lastPlayed?: number;
  isPlaying: boolean;
}

function MusicTitle({ title, artist }: { title: string; artist: string }) {
  return (
    <div className="title-artist">
      <p className="title">{title}</p>
      {/* create an invisible div that copies text and check if the width of that > 100% when inline blocked, if it is, add marquee tag */}
      <p className="artist-name">by {artist} :3</p>
    </div>
  );
}

export default function MusicCard() {
  const DISCORD_ID = "413331641109446656";
  const { data } = useLanyard(DISCORD_ID);
  const [oldMusic, setOldMusic] = useState<MusicData>();

  useEffect(() => {
    if (data == null || data.spotify == null) {
      if (localStorage.getItem("oldMusic") != null) {
        const storedMusic = JSON.parse(localStorage.getItem("oldMusic")!);
        setOldMusic({
          ...storedMusic,
          isPlaying: false,
        });
      } else {
        setOldMusic({
          artist: "None",
          art_url: "/placeholder_album_art.png",
          title: "No recent music",
          length: 0,
          elapsed: 0,
          lastPlayed: Date.now(),
          isPlaying: false,
        });
      }
    } else {
      let music_data: MusicData = {
        artist: data!.spotify!.artist,
        art_url: data!.spotify!.album_art_url!,
        title: data.spotify!.song,
        length: data.spotify.timestamps.end - data.spotify.timestamps.start,
        elapsed: new Date().getTime() - data.spotify.timestamps.start,
        lastPlayed: Date.now(),
        isPlaying: true,
      };
      setOldMusic(music_data);
    }
  }, [data]);

  useEffect(() => {
    if (oldMusic) {
      localStorage.setItem("oldMusic", JSON.stringify(oldMusic));
    }
  }, [oldMusic]);
  return (
    <div
      className={`music_card ${
        oldMusic?.isPlaying ? "playing" : "not-playing"
      }`}
    >
      <div className="music_status_header">
        <p className="status-text">
          {oldMusic?.isPlaying ? "Currently Playing" : "Recently Played"}
        </p>
      </div>

      <div className="music_content">
        <div className="image_wrapper">
          <img
            className="album_art_glow"
            height={60}
            width={60}
            src={oldMusic?.art_url || "/placeholder_album_art.png"}
            alt="Album art"
          />
          <img
            className="album_art"
            height={60}
            width={60}
            src={oldMusic?.art_url || "/placeholder_album_art.png"}
            alt="Album art"
          />
        </div>

        <div className="music_card_end">
          <MusicTitle
            title={oldMusic?.title || "No recent music"}
            artist={oldMusic?.artist || "Unknown"}
          />
        </div>
      </div>
    </div>
  );
}
