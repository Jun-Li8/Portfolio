import { useEffect, useState } from 'react'
import '../../assets/styles/blog.css'
import { useParams } from 'react-router-dom';
import { BlogDocument } from './BlogNewsFeed';
import DOMPurify from 'dompurify';

const apiURI = import.meta.env.VITE_API_URI;



const BlogPost = () => {
    
    const blogParams = useParams<{id: string}>();
    const [blogContent, setBlogContent] = useState<BlogDocument | null>(null);
    
    useEffect(() => {
        const fetchOneBlogPost = async () => {
            try{
                const response = await fetch(`${apiURI}/api/get-a-blog-post/${blogParams.id}`);
                const data = await response.json();
                setBlogContent(data);
            }catch(error){
                console.error(`Error fetching blog ${blogParams.id} :`, error);
            }
        }
        fetchOneBlogPost();
    });
    return (
        <div>
            <div className='blogPostHeader'>
                <h1 className="text-2xl">{blogContent?.title}</h1>
                <p>{blogContent?.shortDescription}</p>
            </div>
            <div className='blogPostContent' 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogContent?.content || '')}} />
            <div>
                <h1 className='text-xl font-bold'>Comments</h1>
                <div>

                </div>
                <CommentComposer />
            </div>
        </div>
    )
}

const CommentComposer = () => {
    return (
        <div>
            <textarea className="w-full max-w-3xl rounded-sm p-3"name="comments" placeholder="Add a comment" id="comments" />
            <div>
                <div className=''>
                    <input placeholder='Your Name'></input>
                    <button>Add</button>
                </div>
            </div>
        </div>
    )
}

export default BlogPost