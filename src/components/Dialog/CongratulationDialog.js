import React from "react";
import ReactConfetti from "react-confetti";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const CongratulationDialog = ({
  open,
  handleClose,
  title,
  content,
  confirmText,  
}) => {
  return (
    <>  
      {open && <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
      />}    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >        
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>        
          <Button 
            onClick={handleClose}
            autoFocus
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}