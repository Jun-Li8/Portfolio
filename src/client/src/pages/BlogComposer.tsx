import { FormEvent, useState } from "react";
import '../assets/styles/blog.css'
import RichTextEditor from "@/components/RichTextEditor";


const BlogComposer = () => {
    const apiURI = import.meta.env.VITE_API_URI;
    const [title,setTitle] = useState<string>("");
    const [content,setContent] = useState<string>('');

    const [loading,setLoading] = useState<boolean>(false);

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    }
    const handleCreateBlog = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await fetch(`${apiURI}/api/create-new-blog`,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({title,content})
            });
            const data = await response.text()
            console.log(data);
        }catch (err){
            console.log('Error creating blog: ', err);
        }finally{
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleCreateBlog} className="blogComposeContainer">
            <div className="blogComposeTitle max-w-4xl">
                <label>Title</label>
                <input type="text" value={title} onChange={(event) => {setTitle(event.currentTarget.value)}}/>
            </div>
            <div>
                <RichTextEditor content={content} onContentChange={handleContentChange}/>
            </div>
            <div>
                <button type="submit" className="createOrEditButton">
                    {loading ? 'Creating...' : 'Create Blog'}
                </button>
            </div>
        </form>
    );
}

export default BlogComposer