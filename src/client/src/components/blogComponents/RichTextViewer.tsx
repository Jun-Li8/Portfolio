import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import '../../assets/styles/blog.css';
import { generateJSON } from '@tiptap/core'

interface RichTextViewerProps {
    content: string | undefined,
    className?: string
}

// Convert HTML string to TipTap Content
const htmlToTipTapContent = (htmlString: string | undefined): any => {
  return generateJSON(htmlString || '', [
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
    // Add any additional extensions you're using
  ]);
}

const RichTextViewer = ({content,className=''}: RichTextViewerProps) => {
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
    editor.commands.setContent(htmlToTipTapContent(content));
    return (
        <div>
            {JSON.stringify(htmlToTipTapContent(content))}
            <EditorContent editor={editor}/>
        </div>
    )
};

export default RichTextViewer
