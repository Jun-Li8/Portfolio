import { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/styles/blog.css'
import { BlogNewsFeed } from "./BlogNewsFeed";

const Blog = () => {
    return (
        <div>
            <button className="makeBlogButton">
                <Link to={'/blog/composer'}>
                    New Blog
                </Link>
            </button>
            <BlogNewsFeed />
        </div>
    );
}

export default Blog;