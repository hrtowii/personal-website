import React, {useEffect, useState} from 'react';
import {useLanyard, type Data} from 'use-lanyard';
import './Sidebar.css'
import MusicCard from './MusicCard';
// import GitHubCalendar from 'react-github-calendar';
export default function Sidebar() {
    const DISCORD_ID = '413331641109446656';
	const {data} = useLanyard(DISCORD_ID);
    const [avatarLink, setAvatarLink] = useState("");
    // console.log(data?.discord_user.avatar)
    useEffect(() => {
        setAvatarLink(`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data?.discord_user.avatar ?? '60dd1a376bf9e675e002ee5acbdab313'}.png?size=512`)
    }, [data])
    return (
        <div id="sidebar">
            <div className="sidebar-top">
            <div className="intro">
                <div className='pfp_wrapper'>
                    <img className="pfp_glow" height={125} width={125} src={avatarLink}/>
                    <img className="pfp" height={125} width={125} src={avatarLink}/>
                </div>
                <div className="intro_text">
                    <span>Hi, I'm <span className='my_name'>Lucas</span></span>
                    <p>Currently studying IT at Nanyang Polytechnic</p>
                    <p>Learning fullstack!</p>
                </div>
            </div>
            <p>If you want to chat, feel free to reach out to me on <a className='twitter' href='https://twitter.com/htrowii'><span className='twitter'>Twitter</span></a> and <a className='discord' href='https://discord.com/users/413331641109446656'><span className='discord'>Discord</span></a>. You can also <a className='email-me' href="mailto:me@hrtowii.dev"><span className='email-me'>email me at me@hrtowii.dev</span></a></p>
            </div>
            {/* <GitHubCalendar username="hrtowii" /> */}
            <div className="sidebar-bottom">
                <MusicCard/>
            </div>
        </div>
    )
}
