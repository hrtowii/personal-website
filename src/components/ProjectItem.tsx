import React, { useEffect, useState } from 'react';
import './ProjectItem.css'
import FancyHyperlink from './FancyHyperlink';
interface ProjectItemProps {
  id: string;
  title: string;
  repo: string;
  link: string;
  description: string;
  images?: string[];
}

const ProjectItem: React.FC<ProjectItemProps> = ({ id, title, repo, link, description, images }) => {
  const [stars, setStars] = useState<number | string>('Loading');

  useEffect(() => {
    const fetchStars = async () => {
      try {
        // const res = await fetch(`https://api.github.com/repos/${repo}`);
        // const data = await res.json();
        // setStars(data.stargazers_count);
        // use this to prevent rate limiting yourself
        setStars(100)
      } catch (error) {
        console.error('Error fetching repo data:', error);
        setStars('N/A');
      }
    };

    fetchStars();
  }, [repo]);

  return (
    <div id={id} className="item">
      <div className="item-wrapper">
        <div className="item-content">
          <div className="item-title">
            <h4>{title}</h4>
            <div className="stars">
              <svg
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
                className="octicon octicon-star-fill starred-button-icon d-inline-block mr-2"
              >
                <path
                  fill="#e5b84e"
                  d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
                ></path>
              </svg>
              <div id={`projectStars_${repo.replace('/', '_')}`}>
                <p>{stars}</p>
              </div>
            </div>
          </div>
          <div className="item-content-again">
            <p>{description}</p>
            {images && images.length > 0 && (
                <div className="carousel-container">
                  {images.map((url, index) => (
                    <img key={index} src={url} alt={`project-${id}-image-${index}`} className="carousel-image" />
                  ))}
                </div>
            )}
          </div>
        </div>
        <FancyHyperlink content="Link to content" href={link} />
      </div>
    </div>
  );
};

export default ProjectItem;