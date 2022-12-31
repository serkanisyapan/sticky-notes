import { useState } from "react";
import "./NewNoteInput.css";

const noteTypes = [
  {
    name: "note",
    color: "#810ca8",
    text: "Note",
  },
  {
    name: "comment",
    color: "#628E90",
    text: "Comment",
  },
  {
    name: "private-comment",
    color: "#FF1E00",
    text: "Private Comment",
  },
];

export const NewNoteInput = ({
  newNoteInputBox,
  stickyNotesCount,
  addNewNote,
}) => {
  const [noteColor, setNoteColor] = useState(noteTypes[0].color);
  const [noteText, setNoteText] = useState("");

  const handleColorChange = (event) => {
    setNoteColor(event.target.value);
  };

  const handleAddNewNote = () => {
    addNewNote({
      noteText,
      id: stickyNotesCount + 1,
      noteColor,
      position: { x: newNoteInputBox.x, y: newNoteInputBox.y },
    });
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      style={{
        position: "absolute",
        top: newNoteInputBox.y,
        left: newNoteInputBox.x,
      }}
      className="new-note-container"
    >
      <span style={{ backgroundColor: noteColor }} className="note-number">
        {stickyNotesCount + 1}
      </span>
      <select
        style={{ backgroundColor: noteColor }}
        className="select-box"
        onChange={handleColorChange}
      >
        {noteTypes.map((noteType, noteTypeID) => (
          <option key={noteTypeID} value={noteType.color}>
            {noteType.text}
          </option>
        ))}
      </select>
      <textarea
        onChange={(event) => setNoteText(event.target.value)}
        className="note-input"
        cols="30"
        rows="5"
      ></textarea>
      <button
        onClick={handleAddNewNote}
        disabled={!noteText}
        className="save-button"
      >
        Save Note
      </button>
    </div>
  );
};
