"use client";

import { useEffect, useRef } from "react";
import SimpleButton from "./simpleButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // 🔒 trava scroll do body
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);

    // 🎯 garante foco
    setTimeout(() => {
      modalRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl outline-none animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <div className="mt-6 flex justify-end">
          <SimpleButton type="button" onClick={onClose} variant="primary">
            Fechar
          </SimpleButton>
        </div>
      </div>
    </div>
  );
};
