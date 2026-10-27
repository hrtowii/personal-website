import React, { useState } from "react";
import "./RecentlyPlayed.css";
import MarqueeText from "./MarqueeText.tsx";

export interface LastfmTrack {
	name: string;
	url: string;
	artist: { "#text": string };
	image?: { size: string; "#text": string }[];
	"@attr"?: { nowplaying?: string };
}

function LastfmTrackRow({ track }: { track: LastfmTrack }) {
	const artUrl = track.image?.find((img) => img.size === "medium")?.["#text"];
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

export default function RecentlyPlayed({ tracks }: { tracks: LastfmTrack[] }) {
	const [open, setOpen] = useState(true);

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
