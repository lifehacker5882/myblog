import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const PostListContent = ({ contentJSON }: any) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: contentJSON,
  });

  return <EditorContent editor={editor} />;
};

export default PostListContent;
