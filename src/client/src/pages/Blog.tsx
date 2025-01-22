import { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/styles/blog.css'
import BlogComposer from "./BlogComposer";

const Blog = () => {
    return (
        <div>
            <Link to={'/blog/composer'}>
                <h1>New Blog</h1>
            </Link>
            <BlogComposer />
        </div>
    );
}

export default Blog;