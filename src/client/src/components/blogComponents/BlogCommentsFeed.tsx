import '../../assets/styles/blog.css'

interface BlogComment {
    name: string;
    comment: string;
}

interface BlogCommentFeedProps {
    comments: BlogComment[]
}

const BlogCommentsFeed = ({comments}: BlogCommentFeedProps) => {
    console.log('Comment structure:', comments);
    return (
        <div className='blogCommentFeedContainer'>
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

export {BlogCommentsFeed, type BlogComment}