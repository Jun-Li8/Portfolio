import mongoose, {Schema} from "mongoose";


interface IBlogComment extends Document{
    name: string;
    comment: string;
}

const BlogCommentSchema: Schema = new Schema({
    name: {type: String, require: false},
    comment: {type: String, require: false}
});

interface IBlogModel extends Document{
    title: string;
    shortDescription: string;
    createdAt: Date;
    author: string;
    content?: string;
    blogComments?: IBlogComment[];
}

const BlogSchema: Schema = new Schema({
    title : {type: String, required: true},
    shortDescription: {type:String, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
    author: {type: String, required: true},
    content: {type: String, required: false},
    blogComments: {type: [BlogCommentSchema], required: false}
});



const BlogModel = mongoose.model<IBlogModel>('Blogs',BlogSchema,'Blogs');

export {BlogModel, type IBlogModel, type IBlogComment}