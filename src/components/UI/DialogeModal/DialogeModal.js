import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (Yes) => {
    setOpen(false);
    if (props.modalClosed && (typeof (props.modalClosed) === "function")) {

      props.modalClosed(Yes)

    }
  };

  return (
    <div>
      <Button
        style={{
          display: "none"
        }}
        variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"انصراف"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            آیا  از افزودن محصول جدید انصراف می دهید ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose(false)} color="primary">
            خیر
          </Button>
          <Button onClick={handleClose(true)} color="primary">
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}