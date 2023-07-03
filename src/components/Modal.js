import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Buttons from "./Buttons";

const buttonStyle = {
  borderRadius: 25,
  width: "fit-content",
  padding: "0.2rem 1.2rem",
  height: "unset",
  fontSize: "0.9rem",
};

function Modal(props) {
  const { text, open, handleClose, handleSubmit } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Buttons
          variant="outlined"
          color="primary"
          btnText="No, cancel"
          onClick={handleClose}
          sx={buttonStyle}
        />
        <Buttons
          btnText="Yes, proceed"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={buttonStyle}
          autoFocus
        />
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
