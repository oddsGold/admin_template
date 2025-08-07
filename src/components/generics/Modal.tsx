import React from 'react';
import Button from '../ui/button/Button';
import { Modal } from '../ui/modal';

interface ModalPopupProps {
  open: boolean;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  name: string;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ open, content, onConfirm, onCancel, name }) => {
  return (
    <Modal isOpen={open} onClose={onCancel} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Delete {name}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            {content} <strong>{name}</strong>?
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onCancel}>
            Close
          </Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-500" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPopup;
