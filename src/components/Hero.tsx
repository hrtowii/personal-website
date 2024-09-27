import React, {useEffect, useState} from 'react';
import {useLanyard, type Data} from 'use-lanyard';
import './Hero.css'
import MusicCard from './MusicCard';
// import GitHubCalendar from 'react-github-calendar';
export default function Hero() {
    const DISCORD_ID = '413331641109446656';
	const {data} = useLanyard(DISCORD_ID);
    const [avatarLink, setAvatarLink] = useState("");
    // console.log(data?.discord_user.avatar)
    useEffect(() => {
        setAvatarLink(`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data?.discord_user.avatar ?? '60dd1a376bf9e675e002ee5acbdab313'}.png?size=512`)
    }, [data])
    return (
        <>
        <section className="shooting_star">
			<span className="span_star"></span>
			<span className="span_star"></span>
			<span className="span_star"></span>
			<span className="span_star"></span>
			<span className="span_star"></span>
			<span className="span_star"></span>
			<span className="span_star"></span>
			<span className="span_star"></span>
			<span className="span_star"></span>
			<span className="span_star"></span>
		</section>
        <div id="Hero">
            <div className="Hero-top">
            <div className='pfp_wrapper'>
                <img className="pfp_glow" height={125} width={125} src={avatarLink}/>
                <img className="pfp" height={125} width={125} src={avatarLink}/>
            </div>
            </div>
            <div className="Hero-bottom">
                <span className='bio'>
                    h t r o w i i
                </span>
                <MusicCard/>
            </div>
        </div>
        </>
    )
}
