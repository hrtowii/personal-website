import React, {useEffect, useState} from 'react';
// import {useLanyard, type Data} from 'use-lanyard';
import './Sidebar.css'
import MusicCard from './MusicCard';

export default function Sidebar() {
    // const DISCORD_ID = '413331641109446656';
	// const {data} = useLanyard(DISCORD_ID);
    // const [avatarLink, setAvatarLink] = useState("");
    // useEffect(() => {
    //     setAvatarLink(`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data?.discord_user.avatar}.png?size=512`)
    // }, [data])
    return (
        <div id="sidebar">
            <div className="sidebar-top">
            <div className="intro">
                <div className='pfp_wrapper'>
                    <img className="pfp_glow" height={125} width={125} src={"https://cdn.discordapp.com/avatars/413331641109446656/6c32c98d780aec6085e07cfc3d53446c.png?size=512"}/>
                    <img className="pfp" height={125} width={125} src={"https://cdn.discordapp.com/avatars/413331641109446656/6c32c98d780aec6085e07cfc3d53446c.png?size=512"}/>
                </div>
                <div className="intro_text">
                    <span>Hi, I'm <span className='my_name'>Lucas</span></span>
                    <p>Currently studying IT at Nanyang Polytechnic</p>
                    <p>Learning fullstack!</p>
                </div>
            </div>
            <p>If you want to chat, feel free to reach out to me on <a className='twitter' href='https://twitter.com/hrtowii'><span className='twitter'>Twitter</span></a> and <a className='discord' href='https://discord.com/users/413331641109446656'><span className='discord'>Discord</span></a>. You can also <a className='email-me' href="mailto:me@hrtowii.dev"><span className='email-me'>email me at me@hrtowii.dev</span></a></p>
            { /* <div className='contact_me'>
                <h2 style={{fontWeight: '400'}}>Contact Me</h2>
                <div className="navsocial">
                    <a href="https://instagram.com/htrowii"><i className="fab fa-instagram"></i><span>Instagram</span></a>
                    <a href="https://t.me/htrowii"><i className="fab fa-telegram"></i><span>Telegram</span></a>
                    <a href="https://github.com/hrtowii"><i className="fab fa-github"></i><span>GitHub</span></a>
                    <a href="mailto:leonghongkit@gmail.com"><i className="fa-solid fa-envelope"></i><span>Email me</span></a>
                </div>
            </div> */}
            </div>
            <div className="sidebar-bottom">
                <MusicCard/>
            </div>
        </div>
    )
}
