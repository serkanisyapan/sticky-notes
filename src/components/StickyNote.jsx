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
      onStop={handleDragEnd}
    >
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleClick}
        className="note"
        style={{
          left: 0,
          top: 0,
          color: stickyNote.color,
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
    </Draggable>
  );
};
