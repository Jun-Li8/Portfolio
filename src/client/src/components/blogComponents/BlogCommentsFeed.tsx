import '../../assets/styles/blog.css'
import {IBlogComment} from '../../../../backend/src/model/BlogModel'

interface BlogCommentFeedProps {
    comments: IBlogComment[]
}

const BlogCommentsFeed = ({comments}: BlogCommentFeedProps) => {
    console.log(comments);
    return (
        <div>
            {comments.map((comment) => (<BlogCommentItem name={comment.name} comment={comment.comment} />))}
        </div>
    )
}

interface BlogCommentItemProps{
    name: string;
    comment: string;
}

const BlogCommentItem = ({name,comment}:BlogCommentItemProps) => {
    return (
        <div className='blogCommentItem'>
            <h1>{name}</h1>
            <div className='blogComment'>{comment}</div>
        </div>
    )
}

export default BlogCommentsFeed