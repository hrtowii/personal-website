import React from "react";
import "./FancyHyperlink.css";
interface FancyHyperlinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  content: string;
}

const FancyHyperlink: React.FC<FancyHyperlinkProps> = ({
  href,
  content,
  ...rest
}) => {
  return (
    <a href={href} className="fancy-link" {...rest}>
      <span className="link-content">
        <span dangerouslySetInnerHTML={{ __html: content }} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arrow-icon"
        >
          <path d="M7 7h10v10"></path>
          <path d="M7 17 17 7"></path>
        </svg>
      </span>
    </a>
  );
};

export default FancyHyperlink;
