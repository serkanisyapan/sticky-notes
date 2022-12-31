import "./NewNoteText.css";
export const NewNoteText = ({ position, handleMouseOver }) => {
  return (
    <div
      className="new-note-text"
      onMouseMove={handleMouseOver}
      style={{
        top: position.y,
        left: position.x + 20,
      }}
    >
      New Note
    </div>
  );
};
