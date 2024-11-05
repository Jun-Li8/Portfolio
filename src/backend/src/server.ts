import express, { json, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ILanguages,Languages } from './model/Languages';

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

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});