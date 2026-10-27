import React, { useEffect, useState } from "react";
import "./MusicCard.css";
import MarqueeText from "./MarqueeText.tsx";
import RecentlyPlayed, { type LastfmTrack } from "./RecentlyPlayed.tsx";

const LASTFM_USER = "htrowii";
const LASTFM_API_KEY = "7a6a9d9af3a543d82266d8f0ff110f2c";

function MusicTitle({ title, artist }: { title: string; artist: string }) {
	return (
		<div className="title-artist">
			<MarqueeText text={title} className="title" />
			<MarqueeText text={`by ${artist}`} className="artist-name" />
		</div>
	);
}

export default function MusicCard() {
	const [tracks, setTracks] = useState<LastfmTrack[]>([]);

	useEffect(() => {
		const controller = new AbortController();
		const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=10`;

		const loadTracks = async () => {
			try {
				const response = await fetch(url, { signal: controller.signal });
				if (!response.ok) {
					throw new Error(`Last.fm request failed: ${response.status}`);
				}
				const data = await response.json();
				if (data.error) throw new Error(data.message || "Last.fm request failed");
				if (!controller.signal.aborted) {
					setTracks(data.recenttracks?.track ?? []);
				}
			} catch (error) {
				if (!controller.signal.aborted) console.error(error);
			}
		};

		void loadTracks();
		const interval = window.setInterval(loadTracks, 60_000);
		return () => {
			controller.abort();
			window.clearInterval(interval);
		};
	}, []);

	const nowPlaying = tracks.find((track) => track["@attr"]?.nowplaying === "true");
	const selectedTrack = nowPlaying ?? tracks[0];
	const artUrl = selectedTrack?.image
		?.slice()
		.reverse()
		.find((image) => image["#text"])?.["#text"] || "/placeholder_album_art.png";
	const recentTracks = tracks.filter((track) => track["@attr"]?.nowplaying !== "true");

	return (
		<div
			className={`music_card ${nowPlaying ? "playing" : "not-playing"}`}
			data-ascii-block
		>
			<div className="music_status_header">
				<p className="status-text">
					{nowPlaying ? "Currently Playing" : "Recently Played"}
				</p>
			</div>

			<div className="music_content">
				<div className="image_wrapper">
					<img
						className="album_art_glow"
						height={60}
						width={60}
						src={artUrl}
						alt="Album art"
					/>
					<img
						className="album_art"
						height={60}
						width={60}
						src={artUrl}
						alt="Album art"
					/>
				</div>

				<div className="music_card_end">
					<MusicTitle
						title={selectedTrack?.name || "No recent music"}
						artist={selectedTrack?.artist["#text"] || "Unknown"}
					/>
				</div>
			</div>

			<RecentlyPlayed tracks={recentTracks} />
		</div>
	);
}
