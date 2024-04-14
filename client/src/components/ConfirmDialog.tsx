import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    children: React.ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, handleClose, handleConfirm, title, children }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} color="error" autoFocus>
                    {title}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
