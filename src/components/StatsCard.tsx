import { useEffect, useState } from "react";
import "./StatsCard.css";
import FancyHyperlink from "./FancyHyperlink.tsx";
interface SiteData {
  updated: string;
  created: string;
  views: number;
  followers: number;
}

const StatsCard = () => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const request = await fetch(
          "https://nekoweb.org/api/site/info/hrtowii.nekoweb.org"
        );
        const json = await request.json();
        // console.log(json);
        const data = {
          updated: new Date(json.updated_at).toLocaleDateString(),
          created: new Date(json.created_at).toLocaleDateString(),
          views: json.views,
          followers: json.followers,
        };
        setSiteData(data);
      } catch (error) {
        console.error("Failed to fetch site data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteData();
  }, []);

  return (
    <div className="stats_card">
      <div className="stats_status_header">
        <p className="status-text">site stats !!</p>
      </div>
      <div className="stats_content">
        {loading ? (
          <p className="loading-text">loading stats...</p>
        ) : siteData ? (
          <div className="stats_grid">
            <div className="stat_item">
              <span className="stat_label">views:</span>
              <span className="stat_value">
                {siteData.views.toLocaleString()}
              </span>
            </div>
            <div className="stat_item">
              <span className="stat_label">followers:</span>
              <span className="stat_value">{siteData.followers}</span>
            </div>
            <FancyHyperlink href="" content="follow me pls :3" />
            {/* <div className="stat_item"> */}
            {/*   <span className="stat_label">last updated:</span> */}
            {/*   <span className="stat_value">{siteData.updated}</span> */}
            {/* </div> */}
            {/* <div className="stat_item"> */}
            {/*   <span className="stat_label">created:</span> */}
            {/*   <span className="stat_value">{siteData.created}</span> */}
            {/* </div> */}
          </div>
        ) : (
          <p className="error-text">failed to load stats</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
