import React, { useState, useEffect } from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true);
      const timeout = setTimeout(() => {
        setIsClosing(false);
      }, 300); // Adjust the transition duration as needed
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    const timeout = setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Adjust the transition duration as needed
    return () => clearTimeout(timeout);
  };

  return (
    <div className={`modal-overlay ${isClosing ? "closing" : ""}`}>
      <div className={`modal-content ${isClosing ? "closing" : ""}`}>
        <button className="modal-close" onClick={handleClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
