import { useState, useRef } from "react";
import Draggable from "react-draggable";
import DeleteIcon from "../assets/deleteicon.png";
import "./StickyNote.css";

export const StickyNote = ({
  stickyNote,
  onMouseEnter,
  onMouseLeave,
  handleDrag,
  handleDragEnd,
  isDragging,
  handleDelete,
  handleEdit,
}) => {
  const [showNoteText, setShowNoteText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  const handleClick = (event) => {
    event.stopPropagation();
    if (!isDragging) setShowNoteText(!showNoteText);
  };

  return (
    <Draggable
      defaultPosition={{ x: stickyNote.position.x, y: stickyNote.position.y }}
      onDrag={handleDrag}
      onStop={(data) => handleDragEnd(data, stickyNote.id)}
    >
      <div
        className="note"
        style={{
          color: stickyNote.color,
          zIndex: showNoteText ? "999" : "1",
        }}
      >
        <span
          style={{
            backgroundColor: stickyNote.noteColor,
            cursor: isDragging ? "grab" : "pointer",
          }}
          className="note-number-note"
          onClick={handleClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {stickyNote.noteText.split(" ").join("").slice(0, 2)}
        </span>
        {showNoteText && (
          <div
            style={{ backgroundColor: stickyNote.noteColor }}
            className="note-text"
          >
            <div className="icon-holder">
              <button
                onClick={(event) => handleDelete(event, stickyNote.id)}
                className="settings-button"
              >
                <img src={DeleteIcon} alt="delete note button" />
              </button>
            </div>
            <div
              onDoubleClick={(event) => {
                event.stopPropagation();
                setIsEditing(true);
              }}
              onClick={(event) => event.stopPropagation()}
            >
              {!isEditing ? (
                stickyNote.noteText
              ) : (
                <textarea
                  className="edit-note-area"
                  cols="30"
                  rows="5"
                  style={{ backgroundColor: stickyNote.color }}
                  value={stickyNote.noteText}
                  type="text"
                  onBlur={() => setIsEditing(false)}
                  onChange={(event) => handleEdit(event, stickyNote.id)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};
