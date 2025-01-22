import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import '../assets/styles/blog.css';

interface RichTextViewerProps {
    title: string,
    content: string,
    className?: string
}

const RichTextViewer = ({title,content,className=''}: RichTextViewerProps) => {
    const editor = useEditor({
        extensions: [
        StarterKit,
          Underline,
          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
          BulletList,
          ListItem,
          Heading.configure({
            levels: [1,2],
          }),
        ],
        content,
        editorProps: {
          attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
          },
        },
        editable:false,
    });

    if (!editor) {
        return null;
    }

    return (
        <div>
            <h1>{title}</h1>
            <EditorContent editor={editor}/>
        </div>
    )
};

export default RichTextViewer
