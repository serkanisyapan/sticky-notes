import { useState } from "react";
import "./StickyNote.css";

export const StickyNote = ({ stickyNote, onMouseEnter, onMouseLeave }) => {
  const [showNoteText, setShowNoteText] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setShowNoteText(!showNoteText);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      className="note"
      style={{
        position: "absolute",
        left: stickyNote.position.x,
        top: stickyNote.position.y,
        color: stickyNote.color,
        padding: "10px 10px",
      }}
    >
      <span
        style={{ backgroundColor: stickyNote.noteColor }}
        className="note-number"
      >
        {stickyNote.id}
      </span>
      {showNoteText && (
        <div
          style={{ backgroundColor: stickyNote.noteColor }}
          className="note-text"
        >
          {stickyNote.noteText}
        </div>
      )}
    </div>
  );
};
