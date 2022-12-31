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
    color: "red",
    text: "Comment",
  },
  {
    name: "private-comment",
    color: "yellow",
    text: "Private Comment",
  },
];

export const NewNoteInput = ({ newNoteInputBox, stickyNoteCount }) => {
  const [noteColor, setNoteColor] = useState(noteTypes[0].color);

  const handleColorChange = (event) => {
    setNoteColor(event.target.value);
  };

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      style={{
        position: "absolute",
        top: newNoteInputBox.y,
        left: newNoteInputBox.x,
      }}
      className="new-note-input"
    >
      <span style={{ backgroundColor: noteColor }} className="note-number">
        {stickyNoteCount + 1}
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
      <textarea className="note-input" cols="30" rows="5"></textarea>
    </div>
  );
};
