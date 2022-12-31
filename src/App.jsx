import { useState, useEffect } from "react";
import "./App.css";
import { NewNoteText } from "./components/NewNoteText";

function App() {
  const [noteMode, setNoteMode] = useState("addNote");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({ x: event.pageX, y: event.pageY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {noteMode === "addNote" && (
        <NewNoteText position={position} handleMouseMove={handleMouseMove} />
      )}
    </>
  );
}

export default App;
