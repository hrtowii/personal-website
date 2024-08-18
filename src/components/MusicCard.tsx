import React, {useEffect} from 'react';
import {useLanyard, type Data} from 'use-lanyard';
import './MusicCard.css'

function MusicTitle(data: any) {
	console.log(data.data)
	if (data.data != null && data.data.spotify != null) {
		return ( 
			<p>Currently listening to {data?.data.spotify.song}</p>
		)
	} else {
		return (
			<p>Not listening to anything!</p>
		)
	}
}

export default function MusicCard() {
	const DISCORD_ID = '413331641109446656';
	const {data} = useLanyard(DISCORD_ID);
	// {
	// 	"track_id": "5pRchw0E4RpVqIWcyVCrJv",
	// 	"timestamps": {
	// 	  "start": 1723979443444,
	// 	  "end": 1723979701709
	// 	},
	// 	"album": "光の中へ",
	// 	"album_art_url": "https://i.scdn.co/image/ab67616d0000b2735b494bdcb8ac3c9c70f46d5b",
	// 	"artist": "結束バンド",2

	// 	"song": "光の中へ"
	console.log(data?.spotify?.song)

	return ( 
	<div className="music_card">
		<img className="album_art" height={125} width={125} src={data?.spotify?.album_art_url || ''}></img>
		<MusicTitle data={data}/>
	</div> );
}
