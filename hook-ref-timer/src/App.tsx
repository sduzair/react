import { useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [milliseconds, setMilliseconds] = useState(0);
  const timerRef = useRef();

  const startTimer = () => {
    if (timerRef.current) stopTimer();
    timerRef.current = setInterval(() => {
      setMilliseconds((prev) => prev + 100);
    }, 100) as unknown as undefined;
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const resetTimer = (): void => {
    clearInterval(timerRef.current);
    setMilliseconds(0);
  };

  return (
    <div className="container">
      <div className="row gy-2">
        <div className="col-12">
          <h1>Timer</h1>
        </div>
        <div className="col-12 fs-1 text-center border border-primary border-3 rounded-3">
          {milliseconds}
        </div>
        <div className="row gy-2 justify-content-end gx-1">
          <div className="col-auto">
            <button onClick={startTimer} className="btn btn-primary">
              Start
            </button>
          </div>
          <div className="col-auto">
            <button onClick={stopTimer} className="btn btn-primary">
              Stop
            </button>
          </div>
          <div className="col-auto">
            <button onClick={resetTimer} className="btn btn-primary">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
