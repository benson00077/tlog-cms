import React, { useState, ChangeEvent } from "react";
import { CloudUpload } from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import "./styles.scss";

export interface IUploaderResponse {
  name: string;
  url: string;
}

type Props = {
  defaultFile?: string;
  accept?: string;
  onChange: Function;
};

function Uploader(props: Props) {
  /* Default Props */
  const args = {
    accept: props.accept ?? "image/*",
    defaultFile: props.defaultFile ?? "",
  };

  const [loading, setLoading] = useState(false);

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    //TODO: axios post req and invokie props.onChange callback function
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={<CloudUpload />}
        >
          {loading && (
            <CircularProgress size={24} sx={{ position: "absolute" }} />
          )}
          Upload
          <input
            className="uploaderInput"
            type="file"
            accept={args.accept}
            onChange={(e) => uploadHandler(e)}
          />
        </Button>
      </div>
    </>
  );
}

export default Uploader;
