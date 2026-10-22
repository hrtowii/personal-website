import { useEffect, useState } from "react";
import { useLanyard } from "use-lanyard";
import "./Sidebar.css";

const ProfileCard: React.FC = () => {
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
      <div className="profile-section">
        <div className="pfp_wrapper">
          <img
            className="pfp_glow"
            height={125}
            width={125}
            src={avatarLink}
            alt="User avatar"
          />
          <img
            className="pfp"
            height={125}
            width={125}
            src={avatarLink}
            alt="User avatar"
          />
        </div>
        <span className="bio">h t r o w i i</span>
      </div>
  );
};

export default ProfileCard;
