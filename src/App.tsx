import "./App.css";
import ParentClass from "./Components/ParentClass.tsx";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(true);
  const component = show ? <ParentClass /> : null;

  return (
    <>
      <button onClick={() => setShow((prevState) => !prevState)} type="button">
        {show ? "Hide" : "Show"}
      </button>
      <div>{component}</div>
    </>
  );
}

export default App;