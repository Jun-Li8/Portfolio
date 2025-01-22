import mongoose, {Schema} from "mongoose";

interface IBlogModel extends Document{
    title: string;
    content: string;
}

const BlogSchema: Schema = new Schema({
    title : {type: String, required: true},
    content: {type: String, required: true}
});

const BlogModel = mongoose.model<IBlogModel>('Blogs',BlogSchema,'Blogs');

export {BlogModel, type IBlogModel}