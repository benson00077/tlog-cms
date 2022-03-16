import { useEffect, useRef, useState } from "react";
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
import { DraftType, IPostItem } from "./types";
import { getMarkdown, insertImage, setUploaderToolbarItem } from "./utils";
import { useMutation } from "@apollo/client";
import { CREATE_ONE_POST, GET_POST_BY_ID } from "./typeDefs";
import { PhotoCamera, TagFacesSharp } from "@mui/icons-material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
} from "../../shared/constants";
import Uploader, {
  IUploaderResponse,
} from "../../components/Uploader/Uploader";
import UploaderModal from "./UploaderModal";
import { useSearchParams } from "react-router-dom";
import client from "../../graphql/apolloClient";

/**
 *  TODO: Refactor editorWrapper into 3 - header, description, editor
 *  TODO: fetch url query params - useful when editing previous post, use query-string.js
 */
function PostEditor() {
  /* graphql */
  const [createPost, { loading: isCreatingPost }] =
    useMutation(CREATE_ONE_POST);

  /* URL query para*/
  let [searchParams, setSearchParams] = useSearchParams();
  const EditingPostId = searchParams.get("id");


  /* editor */
  const editorRef = useRef<Editor>(null);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<IUploaderResponse>({ name: "", url: "" });
  const handleEditorImageChange = (file: IUploaderResponse) => setImage(file);

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

  useEffect(() => {
    setUploaderToolbarItem(editorRef, setOpen); // click to open UploaderModal.tsx
    const id = searchParams.get("id");
    if (id) {
      client
        .query<{ getPostById: IPostItem }, { id: string }>({
          query: GET_POST_BY_ID,
          variables: {
            id: id,
          },
        })
        .then((result) => {
          const { loading, data, error } = result;
          const { title, content, summary, tags, posterUrl } = data.getPostById;
          formik.setValues({ title, summary, tags, posterUrl });
          handleTagsChange(tags)
          return tags

          // TODO:
          // FIXME:
          // how to inject formik.value.tags to mui ui 
          // maybe see mui docs about TextField api: https://mui.com/zh/api/text-field/#main-content
          // or about AutoComplete api: https://mui.com/zh/api/autocomplete/#props
          // InputLabelProps to pass down value(formik.values.tags)? 
          // or just use this dep material-ui-chip-input , but per developer , the dependency will not support mui v5 
          // since v5 have autocomplete https://github.com/TeamWertarbyte/material-ui-chip-input/issues/343#issuecomment-766451429
          // 
          // ref potential solution here https://stackoverflow.com/questions/61348049/material-ui-autocomplete-press-enter-to-create-new-chips
          // ref where I start from here https://stackoverflow.com/questions/70225781/react-chip-input-field
          // maybe lack of name property ? 
          // or lack of `onChange = {formik.handleChange}` >>>>>>>>>>>>>>>>放在handleTagsChange 內嗎？總之要搭配 textField 的  name="tags" 來用

          // 資料上，可以用 formik.setFieldValue("tags", chips); 插入
          // 畫面上，不太確定⋯⋯⋯⋯

          // TODO:
          // markdown content not yet update after fetching
        })
        .then((tags) => {
          const tagsInput = document.querySelector("input#tags-filled")
          if (!tagsInput) return null
          console.log(tagsInput)
          console.log(tags);
          const event = new Event('input', { bubbles: true });
          tags.forEach((tagText) => {
            tagsInput.dispatchEvent(event);
            console.log(tagText)
          })
          console.log(formik.values.tags)
        })
    }

  
  }, [searchParams]);

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
              // disabled={true}
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
            onChange={(e, chips) => handleTagsChange(chips as string[])}
            multiple
            id="tags-filled"
            options={[]}
            freeSolo
            defaultValue={EditingPostId ? formik.values.tags : [""]}
            renderTags={(value, getTagProps) => {
              console.log(EditingPostId) // NOTICE: only render when input in TextField
              console.log(value)
              return (
                  value.map((option, index) => (
                    <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    />
                    ))
                  )
                }
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
          // ["table", "image", "link"],  // setUploaderToolbarItem() replace image toolbaritem
          ["table", "link"],
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

      <UploaderModal
        open={open}
        onClose={setOpen}
        onChange={handleEditorImageChange}
        onOk={() => insertImage(editorRef, image)}
      />
    </section>
  );
}

export default PostEditor;
