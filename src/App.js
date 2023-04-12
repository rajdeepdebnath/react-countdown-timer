import { useEffect, useState } from "react";

function App() {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeleft, setTimeLeft] = useState(null);
  const [intervalCtrl, setIntervalCtrl] = useState(null);
  const [timeoutCtrl, setTimeoutCtrl] = useState(null);
  const [displayTime, setDisplayTime] = useState("00:00");

  const countDown = () => {
    setTimeLeft((t) => {
      // let t = tl ?? initialTime;
      console.log(`t: ${+t}`);
      let m = Math.floor(+t / 60);
      let s = +t - m * 60 - 1;
      return m * 60 + s;
    });
  };

  const setStart = () => {
    if (intervalCtrl) clearInterval(intervalCtrl);
    setTimeLeft(+min * 60 + +sec);
    let i = setInterval(() => countDown(), 1000);
    console.log(i);
    setIntervalCtrl(i);
    let timouttimer = (min * 60 + sec) * 1000;
    console.log(`timout timer: ${timouttimer}`);
    let t = setTimeout(() => setCompleted(true), timouttimer);
  };

  const setReset = () => {
    setMin(0);
    setSec(0);
    setTimeLeft(0);
    setDisplayTime("00:00");
    clearInterval(intervalCtrl);
  };

  useEffect(() => {
    if (completed && intervalCtrl) {
      console.log(intervalCtrl);
      clearInterval(intervalCtrl);
    }
  }, [completed]);

  useEffect(() => {
    if (timeleft > 0) {
      let m = Math.floor(+timeleft / 60);
      let s = +timeleft - m * 60 - 1;
      let d = `${m > 9 ? m : "0" + m}:${s > 9 ? s : "0" + s}`;
      console.log(`timeLeft: ${+timeleft},m:${m},s:${s},displayTime:${d}`);
      setDisplayTime(d);
    }
  }, [timeleft]);

  return (
    <div>
      <input
        type="number"
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />
      <input
        type="number"
        value={sec}
        onChange={(e) => setSec(e.target.value)}
      />
      <button onClick={setStart}>Start</button>
      <button>Pause/Resume</button>
      <button onClick={setReset}>Reset</button>
      <h1>{displayTime}</h1>
    </div>
  );
}

export default App;
