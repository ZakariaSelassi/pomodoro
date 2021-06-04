import React ,{useState,useEffect}from 'react';
import './Timer.css'
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'
import {CountdownCircleTimer} from "react-countdown-circle-timer";

momentDurationFormatSetup(moment)
const Timer = () => {
    const [secondsLeft, setSecondsLeft] = useState(1500);
    const [timer, setTimer] = useState();
    const [TimerFix,setTimerFix] = useState(1500)
    const minutes = moment.duration(secondsLeft,'s').format('mm:ss')
    const [toggle,setToggle] = useState(false);
    const [toggleBtn , setToggleBtn] = useState(false);
    const start = () => {

        if(toggle){
            console.log("stop")
            clearInterval(timer);
        }else{
            const timer = setInterval(() => {
                setSecondsLeft((secondsLeft) => secondsLeft - 1);
                if (secondsLeft === 0) {
                  clearInterval(timer);
                }
              }, 1000);
              setTimer(timer);
              console.log("run")
        }
        setToggle(!toggle)
     
    };
    useEffect(() => {
      if (secondsLeft === 0) {
        window.location.reload();
        clearInterval(timer);
      }
    }, [secondsLeft, timer]);

    useEffect(() => {
      return () => clearInterval(timer);
    }, [timer]);
    const refreshTimer = () => {  

        if(toggle){
            setToggle(!toggle)
        }
        clearInterval(timer);
        setSecondsLeft(TimerFix);
        window.location.reload();
    };

    return (
        <>
            <h1>Pomodoro Timer</h1>
            <div className="clock">
                <div className="clock-container">
                    <button className="ControlleBtn" onClick={() => {start();} }>{toggle ? "Pause" : "Run"}</button>
                    <button className={toggle ? "ControlleBtn" : "ControlleBtn hiddeBtn"} onClick={refreshTimer}>Refresh timer</button>
                </div>
                <div className="timer-wrapper">
                    <CountdownCircleTimer isPlaying={toggle ? true : false} duration={secondsLeft} colors={[['#5aff15', 0.33],['#F7B801', 0.33],['#A30000', 0.33],]}>
                        {({Timer}) => minutes  } 
                    </CountdownCircleTimer>
                    <div className="timer-msg">
                        <p>{toggle ? "Running" : "Play"}</p>
                    </div>

                </div>
               
            </div>
           
        </>
    );
};

export default Timer;