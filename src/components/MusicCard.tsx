import React, {useEffect, useState} from 'react';
import {useLanyard} from 'use-lanyard';
import './MusicCard.css'

interface MusicData {
	artist: string;
	art_url: string;
	title: string;
	length: number;
	elapsed: number;
}

function msToMinSeconds(millis: number) {
	var minutes = Math.floor(millis / 60000);
	var seconds = Number(((millis % 60000) / 1000).toFixed(0));
return seconds == 60
	? minutes + 1 + ":00"
	: minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function MusicTitle({title, artist, elapsed, length}: {title: string, artist: string, elapsed: number, length: number}) {
	const progressPercentage = (elapsed / length) * 100;
	return ( 
		<>
		<div className='title-artist'>
			<p style={{margin: 0}}>{title}</p>
			<p style={{margin: 0, fontSize: "0.8rem", opacity: 0.8}}>{artist}</p>
		</div>
		<div style={{ marginTop: '10px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.7rem' }}>
          <span>{msToMinSeconds(elapsed)}</span>
          <span>{msToMinSeconds(length)}</span>
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--foreground)', borderRadius: '1rem' }}>
          <div
            style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: 'rgb(var(--accent-light))',
              borderRadius: '2px',
            }}
          />
        </div>
      </div>
		</>
	)
}

export default function MusicCard() {
	const DISCORD_ID = '413331641109446656';
	const {data} = useLanyard(DISCORD_ID);
	const [oldMusic, setOldMusic] = useState<MusicData>()
	useEffect(() => {
		if (data == null || data.spotify == null) {
			if (localStorage.getItem("oldMusic") != null) {
				setOldMusic(JSON.parse(localStorage.getItem("oldMusic")!))
			} else {
				setOldMusic({
					artist: "None",
					art_url: '/placeholder_album_art.png',
					title: "None",
					length: 0,
					elapsed: 0
				})
			}
		} else {
			let music_data: MusicData = {artist: data!.spotify!.artist, art_url: data!.spotify!.album_art_url!, title: data.spotify!.song, length: data.spotify.timestamps.end - data.spotify.timestamps.start, elapsed: new Date().getTime() - data.spotify.timestamps.start}
			console.log("formatted song length:", msToMinSeconds(music_data.length));
			console.log("formatted time elapsed:", msToMinSeconds(music_data.elapsed));
			// console.log(music_data)
			setOldMusic(music_data)
			// console.log(oldMusic)
		}
	}, [data])
	// needed bc set state is async so setting it immediately won't reflect the new data
	useEffect(() => {
		localStorage.setItem("oldMusic", JSON.stringify(oldMusic))
	}, [oldMusic])
	return ( 
	<div className="music_card">
		{/* <div className="music_card_top_left">
			<p style={{marginTop: 0}}>currently listening</p>
		</div> */}
		
		<div className="image_wrapper">
			<img className="album_art_glow" height={125} width={125} src={oldMusic?.art_url || '/placeholder_album_art.png'}></img>
			<img className="album_art" height={125} width={125} src={oldMusic?.art_url || '/placeholder_album_art.png'}></img>
		</div>

		<div className='music_card_end'>
			<MusicTitle title={oldMusic?.title || ""} artist={oldMusic?.artist || ""} elapsed={oldMusic?.elapsed || 0} length={oldMusic?.length || 100}/>
		</div>

	</div> );
}
