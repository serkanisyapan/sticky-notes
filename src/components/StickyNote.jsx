import { useState } from "react";
import Draggable from "react-draggable";
import "./StickyNote.css";
import EditIcon from "../assets/edit.png";
import DeleteIcon from "../assets/deleteicon.png";

export const StickyNote = ({
  stickyNote,
  onMouseEnter,
  onMouseLeave,
  handleDrag,
  handleDragEnd,
  isDragging,
  handleDelete,
}) => {
  const [showNoteText, setShowNoteText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="note"
        style={{
          color: stickyNote.color,
          zIndex: showNoteText ? "999" : "1",
        }}
      >
        <span
          style={{ backgroundColor: stickyNote.noteColor }}
          className="note-number-note"
          onClick={handleClick}
        >
          {stickyNote.noteText.split(" ").join("").slice(0, 2)}
        </span>
        {showNoteText && (
          <div
            style={{ backgroundColor: stickyNote.noteColor }}
            className="note-text"
          >
            <div className="icon-holder">
              <button className="settings-button">
                <img src={EditIcon} alt="edit note button" />
              </button>
              <button
                onClick={(event) => handleDelete(event, stickyNote.id)}
                className="settings-button"
              >
                <img src={DeleteIcon} alt="delete note button" />
              </button>
            </div>
            {stickyNote.noteText}
          </div>
        )}
      </div>
    </Draggable>
  );
};
