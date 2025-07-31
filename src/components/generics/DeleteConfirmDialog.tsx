import React from 'react';
import ModalPopup from "./Modal";

interface DeleteConfirmDialogProps {
    openDialog: boolean;
    title?: string;
    handleDelete: () => void;
    handleCloseDialog: () => void;
    itemToDelete?: {
        id: string | number;
        name?: string;
        title?: string;
        login?: string;
        origin?: string;
    } | null;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
                                                                     openDialog,
                                                                     title,
                                                                     handleDelete,
                                                                     handleCloseDialog,
                                                                     itemToDelete,
                                                                 }) => {
    const getItemName = () => {
        if (!itemToDelete) return '';

        return (
            itemToDelete.name ||
            itemToDelete.title ||
            itemToDelete.login ||
            itemToDelete.origin ||
            `with id ${itemToDelete.id}`
        );
    };

    return (
        <ModalPopup
            open={openDialog}
            content={`Are you sure you want to delete the ${title ? title.toLowerCase() : ""}?`}
            onConfirm={handleDelete}
            onCancel={handleCloseDialog}
            name={getItemName()}
        />
    );
};

export default DeleteConfirmDialog;