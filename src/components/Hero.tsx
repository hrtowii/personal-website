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
            <MusicCard/>
            </div>
            <div className="Hero-bottom">
                <span className='bio'>
                    h t r o w i i
                </span>
                <footer className="footer main-text-small">
                    <a className="footer-links link-twitter" href="https://twitter.com/htrowii">twitter</a>
                    <a className="footer-links link-github" href="https://github.com/hrtowii">github</a>
                    <a className="footer-links link-github" href="/resume.pdf">resume</a>
                    {/* <a className="footer-links link-mastodon" rel="me" href="mailto:leonghongkit@gmail.com">email</a> */}
                    <a className="footer-links link-repo" href="https://discordapp.com/users/413331641109446656">discord</a>
                    <div className="scrunch" aria-hidden="true"></div>
                </footer>
            </div>
        </div>
        </>
    )
}
