import { Editor } from "@toast-ui/react-editor"
import { RefObject } from "react"

export const getMarkdown = (editorRef: RefObject<Editor>) => {
  return editorRef.current 
    ? editorRef.current?.getInstance().getMarkdown()
    : ''
}