import { useState, useEffect, useRef } from "react";
import { NewNoteText } from "./components/NewNoteText";
import { StickyNote } from "./components/StickyNote";
import { NewNoteInput } from "./components/NewNoteInput";
import "./App.css";

function App() {
  const [noteMode, setNoteMode] = useState("addNewNote");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stickyNotes, setStickyNotes] = useState(
    JSON.parse(localStorage.getItem("stickyNotes")) || []
  );
  const [newNoteInputBox, setNewNoteInputBox] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef(null);

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.pageX, y: event.pageY });
  };

  const handleClick = (event) => {
    if (noteMode === "addNewNote") {
      setNoteMode("addingNewNote");
      setNewNoteInputBox({ x: event.pageX, y: event.pageY });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setNoteMode("normalMode");
    }
    if (event.key === "Tab") {
      event.preventDefault();
      if (noteMode === "addNewNote" || noteMode === "addingNewNote") {
        setNoteMode("normalMode");
      } else if (noteMode === "normalMode" || noteMode === "onNote") {
        setNoteMode("addNewNote");
      }
    }
  };

  const addNewNote = (newNote) => {
    setStickyNotes((prev) => [...prev, newNote]);
    setNoteMode("normalMode");
  };

  const handleDrag = () => {
    setIsDragging(true);
    setNoteMode("normalMode");
  };

  const handleDragEnd = (data, id, event) => {
    setTimeout(() => setIsDragging(false), 50);
    const newStickyNotes = stickyNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          position: { x: event.x, y: event.y },
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

  const handleEdit = (event, id) => {
    setStickyNotes(
      stickyNotes.map((note) => {
        if (id === note.id) {
          return { ...note, noteText: event.target.value };
        } else {
          return note;
        }
      })
    );
  };

  useEffect(() => {
    canvasRef.current.focus();
    document.title = "React Sticky Notes";
  }, []);

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(stickyNotes));
  }, [stickyNotes]);

  return (
    <div
      ref={canvasRef}
      className="canvas"
      tabIndex={0}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      style={{
        cursor: noteMode !== "addNewNote" ? "auto" : "crosshair",
      }}
    >
      <div className="instructions">
        <span>Tab (Toggle New Note Mode)</span>
        <span>Double click on note text to edit</span>
      </div>
      {noteMode === "addNewNote" && (
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
            stickyNote={stickyNote}
            onMouseEnter={() => setNoteMode("onNote")}
            onMouseLeave={() => setNoteMode("normalMode")}
            handleDrag={handleDrag}
            handleDragEnd={handleDragEnd}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            isDragging={isDragging}
          />
        ))}
    </div>
  );
}

export default App;
