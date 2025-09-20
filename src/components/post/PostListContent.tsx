import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { type JSONContent } from "@tiptap/react";

const PostListContent = ({ contentJSON }: JSONContent) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: contentJSON,
  });

  return <EditorContent editor={editor} />;
};

export default PostListContent;
