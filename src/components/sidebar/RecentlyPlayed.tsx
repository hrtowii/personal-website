import React, { useEffect, useState } from "react";
import "./RecentlyPlayed.css";
import MarqueeText from "./MarqueeText.tsx";

const LASTFM_USER = "htrowii";
const LASTFM_API_KEY = "7a6a9d9af3a543d82266d8f0ff110f2c";
const CACHE_KEY = "lastfmRecentCache";
const CACHE_HITS = 3;

interface LastfmTrack {
	name: string;
	url: string;
	artist: { "#text": string };
	image: { size: string; "#text": string }[];
	"@attr"?: { nowplaying?: string };
}

interface LastfmCache {
	tracks: LastfmTrack[];
	nowPlaying: LastfmTrack | null;
	hits: number;
}

function LastfmTrackRow({ track }: { track: LastfmTrack }) {
	const artUrl = track.image.find((img) => img.size === "medium")?.["#text"];
	return (
		<div className="track_row">
			{artUrl && (
				<div className="image_wrapper">
					<img
						className="album_art_glow"
						height={40}
						width={40}
						src={artUrl || "/placeholder_album_art.png"}
						alt="Album art"
					/>

					<img
						className="album_art"
						src={artUrl}
						alt=""
						height={40}
						width={40}
					/>
				</div>
			)}
			<div className="track_info">
				<MarqueeText
					text={track.name}
					className="track_title"
					as="a"
					href={track.url}
					target="_blank"
					rel="noopener noreferrer"
				/>
				<MarqueeText
					text={track.artist["#text"]}
					className="track_artist"
				/>
			</div>
		</div>
	);
}

export default function RecentlyPlayed() {
	const [tracks, setTracks] = useState<LastfmTrack[] | null>(null);
	const [nowPlaying, setNowPlaying] = useState<LastfmTrack | null>(null);
	const [open, setOpen] = useState(true);

	useEffect(() => {
		if (!LASTFM_API_KEY) {
			return;
		}

		const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
			LASTFM_USER
		)}&api_key=${encodeURIComponent(LASTFM_API_KEY)}&format=json&limit=10`;

		const fetchTracks = async () => {
			try {
				const res = await fetch(url);
				if (!res.ok) throw new Error(`Last.fm API error: ${res.status}`);
				const data = await res.json();
				const rawTracks: LastfmTrack[] = data?.recenttracks?.track ?? [];

				if (!rawTracks.length) {
					return;
				}

				const playing =
					rawTracks[0]?.["@attr"]?.nowplaying === "true" ? rawTracks[0] : null;
				const tracks = playing ? rawTracks.slice(1) : rawTracks;
				setNowPlaying(playing);
				setTracks(tracks);
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ tracks, nowPlaying: playing, hits: 0 })
				);
			} catch {
			}
		};

		let cache: LastfmCache | null = null;
		try {
			const raw = localStorage.getItem(CACHE_KEY);
			cache = raw ? (JSON.parse(raw) as LastfmCache) : null;
		} catch {
		}

		if (cache && (cache.tracks?.length || cache.nowPlaying)) {
			if (cache.hits < CACHE_HITS) {
				setNowPlaying(cache.nowPlaying);
				setTracks(cache.tracks);
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ ...cache, hits: cache.hits + 1 })
				);
			} else {
				fetchTracks();
			}
		} else {
			fetchTracks();
		}
	}, []);

	return (
		<div className="music_dropdown">
			<button
				className="music_dropdown_toggle"
				onClick={() => setOpen(!open)}
				aria-expanded={open}
			>
				<p className="status-text">recently played</p>
				<svg
					className={`chevron ${open ? "rotated" : ""}`}
					width="14"
					height="14"
					viewBox="0 0 16 16"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
					/>
				</svg>
			</button>

			<div className={`music_dropdown_content ${open ? "open" : ""}`}>
				{tracks && tracks.length > 0 && (
					<ul className="track-list">
						{tracks.map((track, index) => (
							<li key={index} className="lastfm-track">
								<LastfmTrackRow track={track} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
