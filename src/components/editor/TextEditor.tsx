// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";

type TextEditorProps = {
  content?: string;
  onChange?: (content: any) => void;
};

const TextEditor: React.FC<TextEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content, // initial content
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={providerValue}>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </EditorContext.Provider>
  );
};

export default TextEditor;
