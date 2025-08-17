import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const PostListContent = ({ contentJSON }: any) => {
  const editor = useEditor({
    editable: false, // ikke redigerbar
    extensions: [StarterKit],
    content: contentJSON, // her setter vi Tiptap JSON
  });

  return <EditorContent editor={editor} />;
};

export default PostListContent;
