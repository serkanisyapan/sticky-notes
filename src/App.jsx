import { useState, useEffect } from "react";
import { NewNoteText } from "./components/NewNoteText";
import { StickyNote } from "./components/StickyNote";
import { NewNoteInput } from "./components/NewNoteInput";
import "./App.css";

function App() {
  const [noteMode, setNoteMode] = useState("addNote");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stickyNotes, setStickyNotes] = useState([]);
  const [newNoteInputBox, setNewNoteInputBox] = useState({ x: 0, y: 0 });

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

  const stickyNotesCount = stickyNotes.length;

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
          stickyNotesCount={stickyNotesCount}
          newNoteInputBox={newNoteInputBox}
          addNewNote={addNewNote}
        />
      )}
      {stickyNotes &&
        stickyNotes.map((stickyNote) => <StickyNote stickyNote={stickyNote} />)}
    </>
  );
}

export default App;
