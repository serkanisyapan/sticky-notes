import { useState, useEffect } from "react";
import { NewNoteText } from "./components/NewNoteText";
import { StickyNote } from "./components/StickyNote";
import "./App.css";

function App() {
  const [noteMode, setNoteMode] = useState("addNote");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stickyNotes, setStickyNotes] = useState([
    {
      id: "1",
      note: "Hello World",
      position: { x: 350, y: 200 },
      color: "#810CA8",
    },
  ]);
  const [newNoteInput, setNewNoteInput] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.pageX, y: event.pageY });
  };

  const handleClick = (event) => {
    setNoteMode("addingNewNote");
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
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
      {noteMode === "addingNewNote" && <NewNoteInput />}
      {stickyNotes &&
        stickyNotes.map((stickyNote) => <StickyNote stickyNote={stickyNote} />)}
    </>
  );
}

export default App;
