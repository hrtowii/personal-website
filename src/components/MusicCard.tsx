import React, {useEffect, useState} from 'react';
import {useLanyard, type Data} from 'use-lanyard';
import './MusicCard.css'

interface MusicData {
	artist: string;
	art_url: string;
	title: string;
}

function MusicTitle(title: any) {
	return ( 
		<p style={{marginBottom: 0, overflow: 'hidden'}}>{title.title}</p>
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
					title: "None"
				})
			}
		} else {
			let music_data: MusicData = {artist: data!.spotify!.artist, art_url: data!.spotify!.album_art_url!, title: data.spotify!.song}
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
		<div className="music_card_top_left">
			<p style={{marginTop: 0}}>currently listening</p>
		</div>
		
		<div className="image_wrapper">
			<img className="album_art_glow" height={150} width={150} src={oldMusic?.art_url || '/placeholder_album_art.png'}></img>
			<img className="album_art" height={150} width={150} src={oldMusic?.art_url || '/placeholder_album_art.png'}></img>
		</div>

		<div className='music_card_end'>
			<MusicTitle title={oldMusic?.title || ""}/>
		</div>

	</div> );
}
