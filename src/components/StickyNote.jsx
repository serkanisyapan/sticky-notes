export const StickyNote = ({ stickyNote }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: stickyNote.position.x,
        top: stickyNote.position.y,
        color: stickyNote.color,
        padding: "10px 10px",
      }}
    >
      Sticky Note
    </div>
  );
};
