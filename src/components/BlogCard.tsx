import React from "react";
import "./BlogCard.css";
import FancyHyperlink from "./FancyHyperlink";

interface BlogPost {
  title: string;
  date: string;
  slug: string;
}

interface BlogCardProps {
  blogPosts: BlogPost[];
}

function BlogCard({ blogPosts }: BlogCardProps) {
  return (
    <div className="blog_card">
      <div className="blog_status_header">
        <p className="status-text">blog !!</p>
        <FancyHyperlink href="/blog" content="view all" />
      </div>
      <div className="blog_content">
        {blogPosts.map((post, index) => (
          <a href={`/blog/${post.slug}`}>
            <div key={index} className="blog-entry">
              <div className="blog-entry-info">
                <p className="blog-entry-title">{post.title}</p>
                <p className="blog-entry-date">{post.date}</p>
              </div>
              <div className="blog-entry-link">
                <FancyHyperlink
                  href={`/blog/${post.slug}`}
                  content="Read More"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default BlogCard;
