import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { useSelector } from "react-redux";
import { authStore } from "@/redux/reducer/authSlice";

function CustomEditor({ data, setData, onChange }) {
  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "alignment",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
    ],
  };

  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={data}
      onChange={(event, editor) => {
        const data = editor.getData();
        setData(data);
        onChange(data);
      }}
    />
  );
}

export default CustomEditor;
