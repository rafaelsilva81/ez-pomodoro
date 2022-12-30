import { useEffect, useState } from "react";

function App() {
  let interval: ReturnType<typeof setTimeout>;
  let interval2: ReturnType<typeof setTimeout>;
  const [sessionTimer, setSessionTimer] = useState(25);
  const [breakTimer, setBreakTimer] = useState(5);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playing && sessionTimer > 0) {
      interval = setTimeout(() => {
        setSessionTimer(sessionTimer - 1);
      }, 1000 * 60);
    } else if (playing && sessionTimer === 0 && breakTimer > 0) {
      interval2 = setTimeout(() => {
        setBreakTimer(breakTimer - 1);
      }, 1000 * 60);
    } else if (playing && sessionTimer === 0 && breakTimer === 0) {
      setSessionTimer(25);
      setBreakTimer(5);
    } else {
      clearTimeout(interval);
      clearTimeout(interval2);
    }
  }, [playing, sessionTimer, breakTimer]);

  const resetTimes = () => {
    setPlaying(false);
    setSessionTimer(25);
    setBreakTimer(5);
  };

  return (
    <div className="h-screen w-screen bg-neutral-900 flex items-center justify-center">
      <div className="bg-white p-2 rounded-md flex flex-col gap-5">
        <h1 className="text-red-600 font-bold text-4xl text-center">
          EZPomodoro
        </h1>
        <section className="flex flex-row justify-between gap-8">
          <div className="flex flex-col bg-gray-300 items-center rounded-md p-2 gap-2">
            <h2 className="text-xl font-bold"> Session </h2>
            <div className="flex flex-row gap-2">
              <button
                className="bg-red-600 text-white p-2 font-bold"
                onClick={() =>
                  setSessionTimer(sessionTimer - 1 <= 0 ? 0 : sessionTimer - 1)
                }
              >
                -
              </button>
              <h1 className="text-4xl font-bold"> {sessionTimer} </h1>
              <button
                className="bg-green-600 text-white p-2 font-bold"
                onClick={() =>
                  setSessionTimer(
                    sessionTimer + 1 >= 60 ? 60 : sessionTimer + 1
                  )
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col bg-gray-300 items-center rounded-md p-2 gap-2">
            <h2 className="text-xl font-bold"> Break </h2>
            <div className="flex flex-row gap-2">
              <button
                className="bg-red-600 text-white p-2 font-bold"
                onClick={() =>
                  setBreakTimer(breakTimer - 1 <= 0 ? 0 : breakTimer - 1)
                }
              >
                -
              </button>
              <h1 className="text-4xl font-bold"> {breakTimer} </h1>
              <button
                className="bg-green-600 text-white p-2 font-bold"
                onClick={() =>
                  setBreakTimer(breakTimer + 1 >= 60 ? 60 : breakTimer + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-row justify-center gap-8">
          <button
            className="bg-green-600 text-white p-2 font-bold"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            className="bg-red-600 text-white p-2 font-bold"
            onClick={resetTimes}
          >
            Reset
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
