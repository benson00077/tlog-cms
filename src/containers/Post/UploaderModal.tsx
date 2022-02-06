import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Uploader from "../../components/Uploader/Uploader";

type Props = {
  open: boolean;
  onOk: Function;
  onClose: Function;
  onChange: Function;
};

/**
 *  Dialog for uploading image and inserting that img url in markdown context
 */
function UploaderModal({open, onOk, onClose, onChange}: Props) {
  const handleOk = () => {
    onClose(false)
    onOk()
  }
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Insert image to markdown editor.</DialogTitle>
      <DialogContent>
        <Uploader onChange={onChange}/>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleOk}>
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UploaderModal;
