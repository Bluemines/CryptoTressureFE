import * as React from 'react';
import Box from '@mui/material/Box';
import MUIModal from '@mui/material/Modal';
import { SxProps, Theme } from '@mui/material/styles';

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  maxWidth: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
  boxStyle?: SxProps<Theme>;
}

export default function Modal({ open, setOpen, children, boxStyle }: ModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <MUIModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        },
      }}
    >
      <Box sx={{ ...(style as object), ...(boxStyle as object) }}>
        {children}
      </Box>
    </MUIModal>
  );
}
