"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView } from "@blocknote/react";
import { useEffect, useState } from "react";
import * as Y from "yjs";


const { WebsocketProvider } = require("y-websocket")

export default function Editor() {
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [fragment, setFragment] = useState<any>(null);
  const [editor, setEditor] = useState<BlockNoteEditor | null>(null);
  

  useEffect(() => {
    setYdoc(new Y.Doc());
  }, []);
  
  useEffect(() => {
    setProvider(new WebsocketProvider("ws://localhost:1234", "draw-room", ydoc));
    setFragment(ydoc!.getXmlFragment("document-store"));
  }, [ydoc]);

  return editor && <BlockNoteView editor={editor} />;
}
