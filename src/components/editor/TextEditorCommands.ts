import type { Editor } from "@tiptap/react";

export type Control = {
  label: string;
  command: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
  disabled?: (editor: Editor) => boolean;
};

export const controls: Control[] = [
  {
    label: "H1",
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    label: "H2",
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    label: "H3",
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    label: "Paragraph",
    command: (editor) => editor.chain().focus().setParagraph().run(),
    isActive: (editor) => editor.isActive("paragraph"),
  },
  {
    label: "Bold",
    command: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    label: "Italic",
    command: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    label: "Underline",
    command: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
  },
  {
    label: "Set underline",
    command: (editor) => editor.chain().focus().setUnderline().run(),
    disabled: (editor) => editor.isActive("underline"),
  },
  {
    label: "Unset underline",
    command: (editor) => editor.chain().focus().unsetUnderline().run(),
    disabled: (editor) => !editor.isActive("underline"),
  },
  {
    label: "Strike",
    command: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
  },
  {
    label: "Bullet list",
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    label: "Split list item",
    command: (editor) => editor.chain().focus().splitListItem("listItem").run(),
    disabled: (editor) => !editor.can().splitListItem("listItem"),
  },
  {
    label: "Sink list item",
    command: (editor) => editor.chain().focus().sinkListItem("listItem").run(),
    disabled: (editor) => !editor.can().sinkListItem("listItem"),
  },
  {
    label: "Lift list item",
    command: (editor) => editor.chain().focus().liftListItem("listItem").run(),
    disabled: (editor) => !editor.can().liftListItem("listItem"),
  },
  {
    label: "Blockquote",
    command: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    label: "Code block",
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
  {
    label: "Horizontal rule",
    command: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: (editor) => editor.isActive("horizontalRule"),
  },
  {
    label: "Highlight",
    command: (editor) => editor.chain().focus().toggleHighlight().run(),
    isActive: (editor) => editor.isActive("highlight"),
  },
  {
    label: "Orange",
    command: (editor) =>
      editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run(),
    isActive: (editor) => editor.isActive("highlight"),
  },
  {
    label: "Green",
    command: (editor) =>
      editor.chain().focus().toggleHighlight({ color: "#8ce99a" }).run(),
    isActive: (editor) => editor.isActive("highlight"),
  },
  {
    label: "Red",
    command: (editor) =>
      editor.chain().focus().toggleHighlight({ color: "red" }).run(),
    isActive: (editor) => editor.isActive("highlight"),
  },
  {
    label: "Unset highlights",
    command: (editor) => editor.chain().focus().unsetHighlight().run(),
    isActive: (editor) => editor.isActive("highlight"),
  },
];
