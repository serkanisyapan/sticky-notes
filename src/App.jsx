import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return;
}

export default App;
