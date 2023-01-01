import { useState } from "react";
import Draggable from "react-draggable";
import "./StickyNote.css";

export const StickyNote = ({
  stickyNote,
  onMouseEnter,
  onMouseLeave,
  handleDrag,
  handleDragEnd,
  isDragging,
}) => {
  const [showNoteText, setShowNoteText] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    if (!isDragging) setShowNoteText(!showNoteText);
  };

  return (
    <Draggable
      defaultPosition={{ x: stickyNote.position.x, y: stickyNote.position.y }}
      onDrag={handleDrag}
      onStop={(event, data) => handleDragEnd(event, data, stickyNote.id)}
    >
      <div
        className="note"
        style={{
          color: stickyNote.color,
          zIndex: showNoteText ? "999" : "1",
        }}
      >
        <span
          style={{ backgroundColor: stickyNote.noteColor }}
          className="note-number-note"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={handleClick}
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
    </Draggable>
  );
};
