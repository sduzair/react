import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!start) return;
    const timer = setInterval(() => {
      setMilliseconds((prev) => prev+=10);
    }, 10);
    return () => {
      clearInterval(timer);
    };
  }, [start]);

  function formatTime(milliseconds: number): string {
    // throw new Error("Function not implemented.");
    const mmm = String((milliseconds % 1000)).padStart(3, '0');
    const ss = String((Math.floor(milliseconds / 1000) % 60)).padStart(2, '0');
    const mm = String((Math.floor(milliseconds / (1000 * 60)) % 60)).padStart(2, '0');
    const hh = String((Math.floor(milliseconds / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    return `${hh}:${mm}:${ss}:${mmm}`
  }

  return (
    <div className="container">
      <div className="row gy-2">
        <div className="col-12">
          <h1>Timer</h1>
        </div>
        <div className="col-12 fs-1 text-center border border-3 border-primary rounded">
          {formatTime(milliseconds)}
        </div>
        <div className="row gy-2 justify-content-end gx-1">
          <div className="col-auto">
            <button onClick={() => setStart(true)} className="btn btn-primary">
              Start
            </button>
          </div>
          <div className="col-auto">
            <button onClick={() => setStart(false)} className="btn btn-primary">
              Stop
            </button>
          </div>
          <div className="col-auto">
            <button
              onClick={() => {
                setStart(false);
                setMilliseconds(0);
              }}
              className="btn btn-primary"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
