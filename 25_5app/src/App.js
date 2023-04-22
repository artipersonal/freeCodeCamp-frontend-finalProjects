import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {

  const [timeNum, setTimeNum] = useState({ time: 1500, status: false, break: false });
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const myTimer = useRef(null);
  let myTimeout = useRef(null);

  useEffect(() => {
    myTimeout.current = null;
  }, [timeNum.status]);


  // NEED TO CHANGE STATUS ONCLICK AND THEN USE useEFFECT TO LAUNCH A TIMER


  useEffect(() => {
    let check = document.getElementById("time-left");
    let check2 = document.getElementById('timer-label');
    if (!check.classList.contains("red") && (timeNum.time <= 59)) {
      check.classList.add("red");
      check2.classList.add('red');
    }
    else if (timeNum.time > 59) {
      check.classList.remove("red");
      check2.classList.remove('red');
    }

  }, [timeNum.time]);

  const laucnhTimer = () => {

    // if there is no timer - this means we start our action or the previous action was completed
    // EQUALS - we may action further
    if (!myTimeout.current) {
      myTimeout.current = setTimeout(() => {
        if (!timeNum.status) {
          myTimer.current = setInterval(() => {
            setTimeNum((prevState) => {
              if (prevState.time <= 0) {
                let aud = document.getElementById("beep");
                aud.play();
                if (prevState.break) {
                  return { time: sessionLength * 60, status: true, break: false }
                }
                else {
                  return { time: breakLength * 60, status: true, break: true }
                };
              }
              else {
                return { time: prevState.time - 1, status: true, break: prevState.break }
              }
            });

          }, 1000);
        }
      }, 100);

    }
  }

  const handleReset = () => {
    clearInterval(myTimer.current);
    let aud = document.getElementById("beep");
    aud.pause();
    aud.currentTime = 0;
    setTimeNum({ time: 1500, status: false, break: false });
    setBreakLength(5);
    setSessionLength(25);
  };

  const handleStop = () => {
    clearInterval(myTimer.current);
    setTimeNum((prevState) => ({ time: prevState.time, status: false, break: prevState.break }));
  }

  return (
    <div id="App">
      <div id="container">
        <div id="header"><h1>25 + 5 Clock</h1></div>
        <div id="labels">
          <div id="break-label">
            <h2>Break Length</h2>
            <div id="break-container">
              <button id="break-decrement" onClick={() => {
                if (breakLength > 1) { setBreakLength((s) => (s - 1)) }
              }
              }><i className="fa-solid fa-arrow-down"></i></button>
              <span id="break-length">{breakLength}</span>
              <button id="break-increment" onClick={() => {
                if (breakLength < 60) {
                  setBreakLength((s) => (s + 1));
                }
              }
              }><i className="fas fa-arrow-up"></i></button>
            </div>
          </div>
          <div id="session-label">
            <h2>Session Length</h2>
            <div id="session-container">
              <button id="session-decrement" onClick={() => {
                if (sessionLength > 1) {
                  setSessionLength((state) => {
                    clearInterval(myTimer.current);
                    setTimeNum({ time: (state - 1) * 60, status: false, break: false });
                    return (state - 1)
                  },)
                }
              }
              }><i className="fa-solid fa-arrow-down"></i></button>
              <span id="session-length">{sessionLength}</span>
              <button id="session-increment" onClick={() => {
                if (sessionLength < 60) {
                  setSessionLength((state) => {
                    clearInterval(myTimer.current);
                    setTimeNum({ time: (state + 1) * 60, status: false, break: false });
                    return (state + 1)
                  },)
                }
              }

              }><i className="fas fa-arrow-up"></i></button>
            </div>
          </div>
        </div>
        <div id="timer">
          <div id="timer-label">{(timeNum.break) ? "Break" : "Session"}</div>
          <div id="time-left">{`${Math.floor(timeNum.time / 60) >= 10
            ? Math.floor(timeNum.time / 60)
            : '0' + Math.floor(timeNum.time / 60).toString()}:${(timeNum.time - Math.floor(timeNum.time / 60) * 60) >= 10
              ? (timeNum.time - Math.floor(timeNum.time / 60) * 60)
              : '0' + (timeNum.time - Math.floor(timeNum.time / 60) * 60).toString()}`}</div>
          <audio hidden controls id="beep" src="https://orangefreesounds.com/wp-content/uploads/2022/12/Clock-gong-sound.mp3"></audio>
        </div>
        <div id="controls">
          <button id="start_stop" onClick={(timeNum.status) ? handleStop : laucnhTimer}>
            <i className="fa-solid fa-play"></i>
            <i className="fa-solid fa-pause"></i>
          </button>
          <button id="reset" onClick={handleReset}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
        </div>
        <div id="footer">
          <h3>Designed and Coded by</h3>
          <h3>Vladimir Samsonov</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
