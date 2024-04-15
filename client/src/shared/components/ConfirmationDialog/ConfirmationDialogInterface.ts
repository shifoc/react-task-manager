export interface ConfirmationDialogProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    children: React.ReactNode;
}