import { useState } from 'react';

export const useDelete = (deleteMutation?: () => { mutate: (id: number) => void }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleOpenDialog = (id: number) => {
    setItemToDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleDelete = () => {
    if (itemToDelete && deleteMutation) {
      deleteMutation().mutate(itemToDelete);
    }
    handleCloseDialog();
  };

  return {
    openDialog,
    itemToDelete,
    handleOpenDialog,
    handleCloseDialog,
    handleDelete,
  };
};
