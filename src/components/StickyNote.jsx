import "./StickyNote.css";
export const StickyNote = ({ stickyNote }) => {
  return (
    <div
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
    </div>
  );
};
