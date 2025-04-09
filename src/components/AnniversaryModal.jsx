import React from "react";
import "./styles/AnniversaryModal.css";

const AnniversaryModal = ({ visible, onClose, name, date, desc }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{name}</h3>
        <p className="modal-date">{date}</p>
        <p className="modal-desc">{desc}</p>
        <button className="modal-button" onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default AnniversaryModal;
