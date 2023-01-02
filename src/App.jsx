import { useState, useEffect } from "react";
import { NewNoteText } from "./components/NewNoteText";
import { StickyNote } from "./components/StickyNote";
import { NewNoteInput } from "./components/NewNoteInput";
import "./App.css";

function App() {
  const [noteMode, setNoteMode] = useState("addNote");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stickyNotes, setStickyNotes] = useState(
    JSON.parse(localStorage.getItem("stickyNotes")) || []
  );
  const [newNoteInputBox, setNewNoteInputBox] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.pageX, y: event.pageY });
  };

  const handleClick = (event) => {
    setNoteMode("addingNewNote");
    setNewNoteInputBox({ x: event.pageX, y: event.pageY });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setNoteMode("addNote");
    }
  };

  const addNewNote = (newNote) => {
    setStickyNotes((prev) => [...prev, newNote]);
    setNoteMode("addNote");
  };

  const handleDrag = () => {
    setIsDragging(true);
    setNoteMode("dragging");
  };

  const handleDragEnd = (event, data, id) => {
    const draggedNote = stickyNotes.find((note) => note.id === id);
    setTimeout(() => setIsDragging(false), 50);
    setNoteMode("onNote");
    const newStickyNotes = stickyNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          position: { x: data.x, y: data.y },
        };
      }
      return note;
    });
    setStickyNotes(newStickyNotes);
  };

  const handleDelete = (event, id) => {
    event.stopPropagation();
    setStickyNotes(stickyNotes.filter((note) => note.id !== id));
  };

  const handleEdit = (event, id, text, color) => {
    return;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(stickyNotes));
  }, [stickyNotes]);

  return (
    <>
      {noteMode === "addNote" && (
        <NewNoteText
          position={mousePosition}
          handleMouseMove={handleMouseMove}
        />
      )}
      {noteMode === "addingNewNote" && (
        <NewNoteInput
          newNoteInputBox={newNoteInputBox}
          addNewNote={addNewNote}
        />
      )}
      {stickyNotes &&
        stickyNotes.map((stickyNote) => (
          <StickyNote
            key={stickyNote.id}
            onMouseEnter={() => setNoteMode("onNote")}
            onMouseLeave={() => setNoteMode("addNote")}
            stickyNote={stickyNote}
            handleDrag={handleDrag}
            handleDragEnd={handleDragEnd}
            isDragging={isDragging}
            handleDelete={handleDelete}
          />
        ))}
    </>
  );
}

export default App;
