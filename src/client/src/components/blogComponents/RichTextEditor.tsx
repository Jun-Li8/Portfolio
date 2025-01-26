import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import '../../assets/styles/blog.css';
import { Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, List, Heading1, Heading2 } from 'lucide-react';


interface MenuButtonProps {
  onClick: () => void;
  icon: React.ElementType;
  isActive?: boolean;
  label: string;
}

const MenuButton = ({ onClick, icon: Icon, isActive, label }: MenuButtonProps) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-200 ${
      isActive ? 'bg-gray-200' : ''
    }`}
    title={label}
    type="button"
  >
    <Icon className="w-4 h-4" />
  </button>
);

interface RichTextEditorProps {
    content: string;
    onContentChange : (content: string) => void
}

const RichTextEditor = ({content,onContentChange}: RichTextEditorProps) => {
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
    onUpdate: ({editor}) => {
        onContentChange(editor.getHTML());
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl border rounded-lg shadow-sm">
      {/* Menu Bar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
        {/* Text Formatting */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={Bold}
          isActive={editor.isActive('bold')}
          label="Bold"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={Italic}
          isActive={editor.isActive('italic')}
          label="Italic"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={UnderlineIcon}
          isActive={editor.isActive('underline')}
          label="Underline"
        />

        <div className="w-px h-6 mx-2 bg-gray-100" />

        {/* Headings */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          icon={Heading1}
          isActive={editor.isActive('heading', { level: 1 })}
          label="Heading 1"
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          icon={Heading2}
          isActive={editor.isActive('heading', { level: 2 })}
          label="Heading 2"
        />

        <div className="w-px h-6 mx-2 bg-gray-100" />

        {/* Alignment */}
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          icon={AlignLeft}
          isActive={editor.isActive({ textAlign: 'left' })}
          label="Align Left"
        />
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          icon={AlignCenter}
          isActive={editor.isActive({ textAlign: 'center' })}
          label="Align Center"
        />
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          icon={AlignRight}
          isActive={editor.isActive({ textAlign: 'right' })}
          label="Align Right"
        />

        <div className="w-px h-6 mx-2 bg-gray-100" />

        {/* Lists */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={List}
          isActive={editor.isActive('bulletList')}
          label="Bullet List"
        />
      </div>

      {/* Editor Content */}
      <div className="p-4 bg-white">
        <EditorContent editor={editor} height={'80px'} />
      </div>
    </div>
  );
};

export default RichTextEditor;