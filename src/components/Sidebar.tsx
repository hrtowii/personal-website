import React, { useEffect, useState } from "react";
import { useLanyard } from "use-lanyard";
import MusicCard from "./MusicCard";

const Sidebar: React.FC = () => {
  const DISCORD_ID = "413331641109446656";
  const { data } = useLanyard(DISCORD_ID);
  const [avatarLink, setAvatarLink] = useState("");

  useEffect(() => {
    setAvatarLink(
      `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${
        data?.discord_user.avatar ?? "60dd1a376bf9e675e002ee5acbdab313"
      }.png?size=512`
    );
  }, [data]);

  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="pfp_wrapper">
          <img
            className="pfp_glow"
            height={125}
            width={125}
            src={avatarLink}
            alt="profile picture"
          />
          <img
            className="pfp"
            height={125}
            width={125}
            src={avatarLink}
            alt="profile picture"
          />
        </div>
        <span className="bio">h t r o w i i</span>
      </div>
      
      <div className="music-section">
        <MusicCard />
      </div>
      
      <div className="social-section">
        <footer className="footer main-text-small">
          <a
            className="footer-links link-twitter"
            href="https://twitter.com/htrowii"
          >
            twitter
          </a>
          <a
            className="footer-links link-github"
            href="https://github.com/hrtowii"
          >
            github
          </a>
          <a
            className="footer-links link-mastodon"
            rel="me"
            href="mailto:leonghongkit@gmail.com"
          >
            email
          </a>
          <a
            className="footer-links link-repo"
            href="https://discordapp.com/users/413331641109446656"
          >
            discord
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
