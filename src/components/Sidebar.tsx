import { useEffect, useState } from "react";
import { useLanyard } from "use-lanyard";
import MusicCard from "./MusicCard";
import LinksCard from "./LinksCard";
import "./Sidebar.css";
import BlogCard from "./BlogCard";
import SettingsCard from "./SettingsCard";

// MARK: blog post fetching logic
import { getCollection } from "astro:content";
const allBlogPosts = await getCollection("blog");
const sortedBlogPosts = allBlogPosts.sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
const blogPosts = sortedBlogPosts.slice(0, 2).map((post) => ({
  title: post.data.title,
  date: post.data.date.toLocaleDateString(),
  slug: post.slug,
}));

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

      <div className="music-section">
        <MusicCard />
      </div>

      <div className="links-section">
        <LinksCard />
      </div>
      <div className="blogs-section">
        <BlogCard blogPosts={blogPosts} />
      </div>
      
      <div className="settings-section">
        <SettingsCard />
      </div>
    </div>
  );
};

export default Sidebar;
