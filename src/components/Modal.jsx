import { X } from "lucide-react";
import React from "react";
import Button from "./form/Button";

const Modal = ({
  title = "Modal Title",
  desc,
  isOpen,
  setIsOpen,
  onConfirm,
  confirmText = "Confirm",
  onCancel = () => {},
  children,
  message,
  buttonData,
  confirmType = "default",
}) => {
  if (!isOpen) return null;

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center min-h-screen overflow-y-auto custom-scrollbar"
      onClick={closeModal}
      style={{ zIndex: 999999 }}
    >
      <div
        className="bg-light rounded-md w-full max-w-xl max-h-[90vh] flex flex-col items-center justify-center px-5 py-3 m-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-row items-center justify-center w-full pb-2">
          <div className="flex flex-col items-start justify-center w-full">
            <h2 className="text-lg font-medium">{title}</h2>
            {desc && <p className="font-normal">{desc}</p>}
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1 hover:bg-hover rounded-md cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="w-full">{message ? message : children}</div>

        {/* Actions */}
        <div className="flex flex-row items-center justify-end w-full gap-4 pt-2">
          {buttonData &&
            buttonData.map((item) => (
              <Button key={item.label} {...item}></Button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
