import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "./quill-editor.css";

import Quill from "quill";
import { forwardRef, MutableRefObject, useEffect, useLayoutEffect, useRef } from "react";

interface QuillEditorProps {
  readOnly?: boolean;
  defaultValue?: any;
  onTextChange: (text: any, other: any, by: string) => any;
  onSelectionChange: (range1: any, range2: any, by: string) => any;
}

export const QuillEditor = forwardRef<Quill | null, QuillEditorProps>(
  // @ts-expect-error types don't match
  function _QuillEditor (
    { readOnly, defaultValue, onTextChange, onSelectionChange }: QuillEditorProps,
    ref: MutableRefObject<Quill | null>,
  ): JSX.Element {
    const containerRef = useRef<any>(null) as MutableRefObject<HTMLDivElement>;
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref?.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: ["bold", "italic", "underline"],
        },
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.clipboard.dangerouslyPasteHTML(defaultValueRef.current, "api");
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return (
      <div ref={containerRef} />
    );
  },
);
