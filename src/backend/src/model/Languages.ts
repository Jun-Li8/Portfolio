import mongoose, {model, Schema} from "mongoose";

interface ILangData extends Document {
    option: string;
    vote: number;
    color: string;
}

interface ILanguages extends Document{
    data: ILangData[];
}

const LangDataSchema: Schema = new Schema({
    option: {type: String, required: true},
    vote: {type: Number, required: true},
    color: {type : String, required: true}
})

const LanguagesSchema: Schema = new Schema({
    data: [LangDataSchema]
});

const Languages = mongoose.model<ILanguages>('Languages',LanguagesSchema,'Languages');

export {ILanguages,Languages,ILangData}