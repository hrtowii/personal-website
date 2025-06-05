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
    <div className="blog-card">
      <div className="blog-card-title">
        <h2>Blog</h2>
        <FancyHyperlink href="/blog" content="view all" />
      </div>
      <div className="blog-entries">
        {blogPosts.map((post, index) => (
          <div key={index} className="blog-entry">
            <div className="blog-entry-part1">
              <h3>{post.title}</h3>
              <p>{post.date}</p>
            </div>
            <div className="blog-entry-part2">
              <FancyHyperlink href={`/blog/${post.slug}`} content="Read More" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogCard;
