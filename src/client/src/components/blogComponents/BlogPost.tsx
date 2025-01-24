import { useEffect, useState } from 'react'
import '../../assets/styles/blog.css'
import { useParams } from 'react-router-dom';
import { BlogDocument } from './BlogNewsFeed';
import RichTextViewer from './RichTextViewer';

const apiURI = import.meta.env.VITE_API_URI;



const BlogPost = () => {
    
    const blogParams = useParams<{id: string}>();
    const [blogContent, setBlogContent] = useState<BlogDocument | null>(null);
    
    useEffect(() => {
        const fetchOneBlogPost = async () => {
            try{
                const response = await fetch(`${apiURI}/api/get-a-blog-post/${blogParams.id}`);
                const data = await response.json();
                console.log(data);
                setBlogContent(data);
            }catch(error){
                console.error(`Error fetching blog ${blogParams.id} :`, error);
            }
        }
        fetchOneBlogPost();
    });
    return (
        <div>
            <div>
                <h1 className="text-2xl">{blogContent?.title}</h1>
                <p>{blogContent?.shortDescription}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: blogContent?.content || '' }} />
        </div>
    )
}

export default BlogPost