import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React from 'react';

const Model = ({title, onClose, open, children}) => {
    const [isOpen, setOpen] = React.useState(open);
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    return (
      <div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
      </div>
    );
  }


export default Model