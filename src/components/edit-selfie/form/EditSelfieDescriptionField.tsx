
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
// Or if you only need the core build
import Quill from "quill";
import { MutableRefObject, useRef, useState } from "react";

import { AttachmentUploader } from "@/components/edit-selfie/uploader/AttachmentUploader";

import { QuillEditor } from "./editor/QuillEditor";
// const Delta = Quill.import("delta");

interface EditSelfieDescriptionFieldProps {
  value: string;
  onChange: (value: string) => any;
  error?: string;
}

export const EditSelfieDescriptionField = ({
  error,
  onChange,
  value,
}: EditSelfieDescriptionFieldProps): JSX.Element => {
  const quillRef = useRef<any>() as MutableRefObject<Quill>;
  const [range, setRange] = useState<[number, number]>([0, 0]);
  const quillGetTextRef = useRef<any>(null);
  const handleUseAttachment = (src: string): void => {
    quillRef.current.insertEmbed(range[0], "image", `${process.env.NEXT_PUBLIC_API_URL as string}${src}`);
  };

  const handleGetText = (): void => {
    clearTimeout(quillGetTextRef.current);
    quillGetTextRef.current = setTimeout(() => {
      const text = quillRef.current.getSemanticHTML();
      onChange(text);
      // onChange(encodeURIComponent(text));
      // onChange("");
    }, 300);
  };

  const handleSetRange = (_rangeText: any, rangeHtml?: any): void => {
    if (rangeHtml) {
      setRange([rangeHtml.index, (rangeHtml.index as number) + (rangeHtml.length as number)]);
    } else {
      setRange([0, 0]);
    }
  };

  return (
    <FormControl error={!!error}>
      <FormLabel>
        description
      </FormLabel>
      <QuillEditor
        ref={quillRef}
        defaultValue={value as any} // new Delta().insert(value)}
        onSelectionChange={handleSetRange}
        onTextChange={handleGetText}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
      <br />
      <AttachmentUploader
        onUseImage={handleUseAttachment}
        onUploadComplete={handleUseAttachment}
      />
    </FormControl>
  );
};
