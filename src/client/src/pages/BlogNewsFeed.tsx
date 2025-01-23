import { useEffect, useState } from 'react'
import '../assets/styles/blog.css'
import { Link } from 'react-router-dom';

interface BlogDocument {
    _id: string;
    title: string;
    shortDescription: string;
    content?: string;
}

const BlogNewsFeed = () => {
    const apiURI = import.meta.env.VITE_API_URI;

    const [blogs,setBlogs] = useState<BlogDocument[]>([]);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try{
                const response = await fetch(`${apiURI}/api/get-all-blogs`);
                const data = await response.json();
                setBlogs(data);
            }catch(error){
                console.error('Error fetching blogs:', error);
            }
        }
        fetchAllBlogs();
    })

    return (
        <div className='newsFeedContainer'>
            {blogs.map((blogItem) => 
                (<BlogItem 
                    blogID={blogItem._id} 
                    title={blogItem.title} 
                    shortDescription={blogItem.shortDescription}/>)
            )}
        </div>
    )
}

interface BlogItemProps{
    blogID: string;
    title: string;
    shortDescription: string;
}

const BlogItem = ({blogID,title,shortDescription} : BlogItemProps) => {
    return (
        <div className='blogItem'>
            <Link to={`/blog/post/${blogID}`}>
                <div>
                    <label className='text-xl font-bold'>{title}</label>
                    <h5>{shortDescription}</h5>
                </div>
            </Link>
        </div>
    )
}

const BlogPost = () => {
    return (
        <h1>Blog Post</h1>
    )
}

export {BlogNewsFeed, BlogPost};