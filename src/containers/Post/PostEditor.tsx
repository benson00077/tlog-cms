import { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import chartPlugin from '@toast-ui/editor-plugin-chart';
import '@toast-ui/chart/dist/toastui-chart.css';
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import tableMergedCellPlugin from '@toast-ui/editor-plugin-table-merged-cell';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import umlPlugin from '@toast-ui/editor-plugin-uml';
import { Autocomplete, Chip, TextField } from '@mui/material';

function PostEditor() {
  const [tagsReciver, setTagsReceiver] = useState<string[]>([]);
  const editorRef = useRef<Editor>(null)

  return (
    <section>
      <form>
        <div>
          <TextField
            required
            fullWidth
            label="Title"
          />
          <div>
            <TextField
              required
              label="PosterUrl"
              disabled={true}
            />
          </div>
        </div>
        <div>
          <TextField
            required
            label="Summary"
            fullWidth
            multiline
            rows="5"
          />
          <Autocomplete
            onChange={(e, value) => setTagsReceiver((state) => value)}
            multiple
            id="tags-filled"
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="↩"
              />
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
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
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
