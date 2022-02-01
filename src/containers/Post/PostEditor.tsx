import { useRef } from "react";
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
import {
  Autocomplete,
  Button,
  Chip,
  IconButton,
  Popover,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import "./PostEditor.scss";
import { DraftType } from "./types";
import { getMarkdown } from "./utils";
import { useMutation } from "@apollo/client";
import { CREATE_ONE_POST } from "./typeDefs";
import { PhotoCamera } from "@mui/icons-material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
} from "../../shared/constants";
import Uploader, {
  IUploaderResponse,
} from "../../components/Uploader/Uploader";

/**
 *  TODO: Refactor editorWrapper into 3 - header, description, editor
 */
function PostEditor() {
  const editorRef = useRef<Editor>(null);

  /* graphql */
  const [createPost, { loading: isCreatingPost }] =
    useMutation(CREATE_ONE_POST);

  /* formik */
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
  const handleImgFileChange = (data: IUploaderResponse) => {
    formik.setFieldValue("posterUrl", data.url);
  };

  const submitHandler = async (draftType: DraftType) => {
    const content = getMarkdown(editorRef);
    const lastModifiedDate = new Date().toISOString();
    const params = {
      ...formik.values,
      content,
      lastModifiedDate,
      isPublic: draftType === DraftType.FINAL,
    };

    await createPost({
      variables: {
        input: params,
      },
    });
    formik.resetForm();
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

            <PopupState variant="popover" popupId="lrcPoperOver">
              {(popupState) => (
                <div>
                  <IconButton
                    aria-label="upload-image"
                    sx={{ position: "relative", top: "-4px" }}
                    {...bindTrigger(popupState)}
                  >
                    <PhotoCamera />
                  </IconButton>

                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={POPOVER_ANCHOR_ORIGIN}
                    transformOrigin={POPOVER_TRANSFORM_ORIGIN}
                    disableRestoreFocus
                  >
                    <Uploader onChange={handleImgFileChange} />
                  </Popover>
                </div>
              )}
            </PopupState>

            <Button
              className="btn"
              color="primary"
              disabled={isCreatingPost}
              onClick={() => submitHandler(DraftType.FINAL)}
            >
              Publish
            </Button>
            <Button
              className="btn"
              color="secondary"
              disabled={isCreatingPost}
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
