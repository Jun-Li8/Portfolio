import { FormEvent, useState } from "react";
import '../../assets/styles/blog.css'
import RichTextEditor from "@/components/blogComponents/RichTextEditor";


const BlogComposer = () => {
    const apiURI = "https://api.zejunli.org"
    const [title,setTitle] = useState<string>("");
    const [shortDescription,setShortDescription] = useState<string>("")
    const [content,setContent] = useState<string>('');
    const [author,setAuthor] = useState<string>('');

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
                body: JSON.stringify({title,shortDescription,content,author})
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
                <label>Title:</label>
                <input type="text" name='title' value={title} onChange={(event) => {setTitle(event.currentTarget.value)}}/>
            </div>
            <div className="blogComposeTitle max-w-4xl">
                <label>Short Description:</label>
                <input type="text" name='shortDescription' value={shortDescription} onChange={(event) => {setShortDescription(event.currentTarget.value)}}/>
            </div>
            <div>
                <RichTextEditor content={content} onContentChange={handleContentChange}/>
            </div>
            <div className="blogComposeTitle max-w-md">
                <label>Your Name:</label>
                <input type="text" name='authorName' value={author} onChange={(event) => {setAuthor(event.currentTarget.value)}}/>
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