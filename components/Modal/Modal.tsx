import css from "./Modal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: ModalProps) => {
  const el = document.createElement("div");
  const router = useRouter();
  const close = () => router.back();

  useEffect(() => {
    document.body.appendChild(el);
    document.body.style.overflow = "hidden";

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onEsc);

    return () => {
      document.body.removeChild(el);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [el, closeModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>,
    el
  );
};

export default Modal;
