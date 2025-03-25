import { useEffect, useState } from 'react'
import '../../assets/styles/blog.css'
import { Link } from 'react-router-dom';
import {IBlogComment} from '../../../../backend/src/model/BlogModel'

interface BlogDocument {
    _id: string;
    title: string;
    shortDescription: string;
    author: string;
    createdAt: Date;
    content?: string;
    blogComments?: IBlogComment[]
}

const apiURI = "https://api.zejunli.org"

const BlogNewsFeed = () => {

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
    },[])

    return (
        <div className='newsFeedContainer'>
            {blogs.map((blogItem) => 
                (<BlogItem
                    blogID={blogItem._id} 
                    title={blogItem.title} 
                    shortDescription={blogItem.shortDescription}
                    author={blogItem.author}
                    createdAt={blogItem.createdAt}
                    />)
            )}
        </div>
    )
}

interface BlogItemProps{
    blogID: string;
    title: string;
    shortDescription: string;
    author: string;
    createdAt: Date;
}

const BlogItem = ({blogID,title,shortDescription,author,createdAt} : BlogItemProps) => {
    return (
        <div id={blogID} className='blogItem'>
            <Link to={`/blog/post/${blogID}`}>
                <div>
                    <label className='text-xl font-bold'>{title}</label>
                    <h6>{`${author} • ${new Date(createdAt).toISOString().split('T')[0]}`}</h6>
                    <strong>Description: </strong><span>{shortDescription}</span>
                </div>
            </Link>
        </div>
    )
}

export {BlogNewsFeed, type BlogDocument};