import { BulletList, ListItem } from "@tiptap/extension-list";
import Blockquote from "@tiptap/extension-blockquote";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
/* import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji"; */
import { controls } from "./TextEditorCommands";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";

type TextEditorProps = {
  content?: any; // JSON-initial content
  onChange?: (content: any) => void;
};

const TextEditor: React.FC<TextEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      Blockquote,
      CodeBlock,
      Paragraph,
      Underline,
      Text,
      /* Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
      }), */
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      HorizontalRule,
      Highlight.configure({ multicolor: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <>
      <EditorContext.Provider value={providerValue}>
        {controls.map((ctrl) => (
          <button
            key={ctrl.label}
            onClick={() => ctrl.command(editor)}
            disabled={ctrl.disabled?.(editor) ?? false}
            className={ctrl.isActive?.(editor) ? "is-active" : ""}
          >
            {ctrl.label}
          </button>
        ))}
        <EditorContent editor={editor} />
        <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
      </EditorContext.Provider>
    </>
  );
};

export default TextEditor;
