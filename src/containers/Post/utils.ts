import { Editor } from "@toast-ui/react-editor"
import { RefObject } from "react"
import { IUploaderResponse } from "../../components/Uploader/Uploader"

export const getMarkdown = (editorRef: RefObject<Editor>) => {
  return editorRef.current 
    ? editorRef.current?.getInstance().getMarkdown()
    : ''
}

/** For markdown within Editor */
export const insertImage = (
  editorRef: RefObject<Editor>,
  image: IUploaderResponse,
) => {
  if (editorRef.current) {
    const instance = editorRef.current.getInstance()
    instance.insertText(`\n\n![${image.name}](${image.url})`)
  }
}

/** 
 * For editor tool bar
 * command invoke when clicked 
 */
export const setUploaderToolbarItem = (
  editorRef: RefObject<Editor>,
  setOpen: Function,
) => {
  if (editorRef.current) {
    const instance = editorRef.current.getInstance()    
    instance.insertToolbarItem({groupIndex: 3, itemIndex: 1}, {
      name: "uploadImg",
      tooltip: "Upload and Insert image",
      className: "image toastui-editor-toolbar-icons",
      command: "uploadImg"
    })
    instance.addCommand("markdown", "uploadImg", () => {
      setOpen(true)
      return true
    })    
  }
}