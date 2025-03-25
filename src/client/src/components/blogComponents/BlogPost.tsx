import { FormEvent, useEffect, useState } from 'react'
import '../../assets/styles/blog.css'
import { useParams } from 'react-router-dom';
import { BlogDocument } from './BlogNewsFeed';
import DOMPurify from 'dompurify';
import {BlogCommentsFeed ,BlogComment } from './BlogCommentsFeed';

const apiURI = "https://api.zejunli.org";



const BlogPost = () => {
    
    const blogParams = useParams<{id: string}>();
    const [blogContent, setBlogContent] = useState<BlogDocument>({_id: 'initial',title: 'initial',shortDescription: 'initial',author:'initial',createdAt: new Date()});
    const [blogComments,setComments] = useState<BlogComment[]>([])

    const handleCommentChange = (newComment: BlogComment) => {
        setComments((prevData) => [...prevData, newComment]);
    }
    
    useEffect(() => {
        const fetchOneBlogPost = async () => {
            try{
                const response = await fetch(`${apiURI}/api/get-a-blog-post/${blogParams.id}`);
                const data = await response.json();
                setBlogContent(data);
                setComments(data?.blogComments || [])
            }catch(error){
                console.error(`Error fetching blog ${blogParams.id} :`, error);
            }
        }
        fetchOneBlogPost();
    },[]);

    return (
        <div>
            <div className='blogPostHeader'>
                <h1 className="text-2xl">{blogContent?.title}</h1>
                <p>{blogContent?.shortDescription}</p>
                <p>{`${blogContent.author} • ${new Date(blogContent.createdAt).toISOString().split('T')[0]}`}</p>
            </div>
            <div>
            </div>
            <div className='blogPostContent' 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogContent?.content || '')}} />
            <div>
                <h1 className='text-xl font-bold'>Comments</h1>
                <div>

                </div>
                <CommentComposer blogID={blogParams.id} onAddComment={handleCommentChange}/>
                <BlogCommentsFeed comments={blogComments} />
            </div>
        </div>
    )
}

interface CommentComposerProps {
    blogID: string | undefined;
    onAddComment: (newComment: BlogComment) => void;
}


const CommentComposer = ({blogID, onAddComment}: CommentComposerProps) => {
    const [comment,setComment] = useState<string>('');
    const [name, setName] = useState<string>('');

    const [loading,setLoading] = useState<boolean>(false);

    const handleCreateComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log('Loading is now', loading);
        try{
            setLoading(false);
            onAddComment({name:name, comment: comment});
            await fetch(`${apiURI}/api/create-new-comment`,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({blogID,name,comment})
            });
        }catch(error){
            console.log('Error creating a comment:', error);
        }finally{
            console.log('Loading is nowz', loading);
        }
    }
    return (
        <form onSubmit={handleCreateComment}>
            <textarea className="w-full max-w-3xl rounded-sm p-3" 
                    name="comments" 
                    placeholder="Add a comment" 
                    id="comments"
                    value={comment}
                    onChange={(event) => {setComment(event.currentTarget.value)}}
                    />
            <div className='blogPostWrapper'>
                <input placeholder='Your Name'
                    value={name}
                    onChange={(event) => {setName(event.currentTarget.value)}}
                />
                <button type='submit' className='blogPostButton'>
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </div>
        </form>
    )
}

export default BlogPost