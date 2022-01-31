import { useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import chartPlugin from "@toast-ui/editor-plugin-chart";
import "@toast-ui/chart/dist/toastui-chart.css";
import colorSyntaxPlugin from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import tableMergedCellPlugin from "@toast-ui/editor-plugin-table-merged-cell";
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import umlPlugin from "@toast-ui/editor-plugin-uml";
import { Autocomplete, Button, Chip, TextField } from "@mui/material";
import { useFormik } from "formik";
import "./PostEditor.scss";
import { DraftType } from "./types";
import { getMarkdown } from "./utils";

function PostEditor() {
  const editorRef = useRef<Editor>(null);

  const formik = useFormik({
    initialValues: {
      posterUrl: "",
      title: "",
      summary: "",
      tags: [] as string[],
    },
    onSubmit: () => {},
  });

  const handleTagsChange = (chips: string[]) => {
    formik.setFieldValue("tags", chips);
  };

  const submitHandler = (draftType: DraftType) => {

    const content = getMarkdown(editorRef)
    const lastModifiedDate = new Date().toISOString()
    const params = {
      ...formik.values,
      content,
      lastModifiedDate, 
      ispublic: draftType === DraftType.FINAL
    }

    console.log(params);
  };

  return (
    <section className="editorWrapper">
      <form>
        <div className="header">
          <TextField
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            required
            fullWidth
            label="Title"
          />
          <div className="publishTools">
            <TextField
              name="posterUrl"
              onChange={formik.handleChange}
              value={formik.values.posterUrl}
              required
              label="PosterUrl"
              disabled={true}
            />
            <Button
              className="btn"
              color="primary"
              onClick={() => submitHandler(DraftType.FINAL)}
            >
              Publish
            </Button>
            <Button className="btn" color="secondary"
              onClick={() => submitHandler(DraftType.DRAFT)}
              >
              Save as Draft
            </Button>
            <Button className="btn">Back</Button>
          </div>
        </div>
        <div className="description">
          <TextField
            name="summary"
            onChange={formik.handleChange}
            value={formik.values.summary}
            required
            label="Summary"
            fullWidth
            multiline
            rows="5"
          />
          <Autocomplete
            onChange={(e, chips) => handleTagsChange(chips)}
            multiple
            id="tags-filled"
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="↩" />
            )}
          />
        </div>
      </form>

      <Editor
        useCommandShortcut={true}
        usageStatistics={false}
        initialValue=""
        previewStyle="vertical"
        height="1000px"
        initialEditType="markdown"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
        plugins={[
          chartPlugin,
          umlPlugin,
          colorSyntaxPlugin,
          tableMergedCellPlugin,
          // embededPlugin,
        ]}
        ref={editorRef}
      />
    </section>
  );
}

export default PostEditor;
