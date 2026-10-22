import MusicCard from "./MusicCard";
import LinksCard from "./LinksCard";
import "./Sidebar.css";
import BlogCard from "./BlogCard";
import SettingsCard from "./SettingsCard";

import WebringCard from "./WebringCard";
import StatsCard from "./StatsCard";
import ProfileCard from "./ProfileCard";
import WebtilesCard from "./WebtilesCard";
import type { BlogPost } from "./BlogCard";

interface SidebarProps {
  blogPosts: BlogPost[];
}

const Sidebar: React.FC<SidebarProps> = ({ blogPosts }) => {
  return (
    <div className="sidebar">
      <ProfileCard />

      <div className="music-section">
        <MusicCard />
      </div>
      <div className="links-section">
        <LinksCard />
      </div>
      <div className="blogs-section">
        <BlogCard blogPosts={blogPosts} />
      </div>
      <div className="webrings-section">
        <WebringCard />
      </div>
      <div className="webrings-section">
        <StatsCard />
      </div>
      <div className="settings-section">
        <SettingsCard />
      </div>
      <div className="settings-section">
        <WebtilesCard />
      </div>
    </div>
  );
};

export default Sidebar;
