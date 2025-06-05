import React from "react";
import "./LinksCard.css";

const LinksCard: React.FC = () => {
  return (
    <div className="links_card">
      <div className="links_status_header">
        <p className="status-text">links !!</p>
      </div>

      <div className="links_content">
        <div className="links_grid">
          <a
            className="link-item link-twitter"
            href="https://twitter.com/htrowii"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitter
          </a>
          <a
            className="link-item link-github"
            href="https://github.com/hrtowii"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <a
            className="link-item link-email"
            href="mailto:leonghongkit@gmail.com"
          >
            email
          </a>
          <a
            className="link-item link-discord"
            href="https://discordapp.com/users/413331641109446656"
            target="_blank"
            rel="noopener noreferrer"
          >
            discord
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinksCard;
