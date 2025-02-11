import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Languages } from './model/Languages';
import { BlogModel } from './model/BlogModel';

dotenv.config();

// Initialize express app
const app = express();

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

// Middleware
app.use(cors());                         // Enable CORS for all routes
app.use(express.json());                 // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


app.get('/', (req: Request, res: Response) => {
    console.log('Visited this site');
    res.json({
        success: true,
        message: 'Welcome to the TypeScript server!'
    });
});

app.get('/api/get-language-data', async (req:Request, res:Response) => {
    try{
        const langs = await Languages.findOne({},{'data._id':0}).exec();
        res.json(langs);
    }catch(error){
        res.status(500).json({message : (error as Error).message});
    }
});

app.post('/api/update-language-data', async (req: Request, res: Response) => {
    const {opt,newVoteNum} = req.body;
    try{
        await Languages.findOneAndUpdate({'data.option': opt},{$set:{'data.$.vote': newVoteNum}});
    }catch(error){
        res.status(500).json({message : (error as Error).message});
    }
});

app.post('/api/create-new-blog', async (req: Request, res: Response) => {
    const {title,shortDescription,content} = req.body;
    console.log('Params:',title,content);
    try{
        const ids = await BlogModel.insertMany([{title: title, shortDescription:shortDescription, content: content, blogComments: []}]);
        console.log('Inserted documents: ', ids);
        res.json(ids);
    }catch (error){
        res.status(500).json({message: (error as Error).message});
    }
});

app.get('/api/get-all-blogs', async (req: Request, res: Response) => {
    try{
        const blogs = await BlogModel.find({},{'title':1,'shortDescription':1});
        res.json(blogs);
    }catch(error){
        res.status(500).json({message : (error as Error).message});
    }
});

app.get('/api/get-a-blog-post/:blogID', async (req: Request, res: Response) => {
    try{
        const blog = await BlogModel.findById(req.params.blogID);
        res.json(blog);
    }catch(error){
        res.status(500).json({message : (error as Error).message});
    }
});

app.post('/api/create-new-comment', async (req: Request, res: Response) => {
    const {blogID,name,comment} = req.body;
    try{
        const result = await BlogModel.updateOne(
            { _id: blogID }, // Filter by user ID
            { $push: { blogComments: {name: name, comment: comment}} }
        );
        console.log('Comment added to blog', blogID);
    }catch(error){
        console.error('Error creating a comment', error);
    }
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});