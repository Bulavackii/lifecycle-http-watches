import { useRef, useState, useEffect } from 'react';
import './clock-style.css';
import { Time } from '../../interfaces/Time';

type ClockProps = {
  title: string,
  timeZone: number,
  times: Time[],
  setTimes: (prev: Time[]) => void
}

const Clock: React.FC<ClockProps> = ({ title, timeZone, times, setTimes }) => {
  const hourEl = useRef(null);
  const minEl = useRef(null);
  const secEl = useRef(null);
  const [date, setDate] = useState(Date.now());
  const hour = Math.floor(((date / 1000 / 60 / 60) + timeZone) % 24);
  const min = Math.floor((date / 1000 / 60 ) % 60);
  const sec = Math.floor((date / 1000 ) % 60);
  const secDeg = sec / 60 * 360;
  const minDeg = min / 60 * 360 + secDeg / 60;
  const hourDeg = 90 + (hour / 12 * 360) + minDeg / 12;
  
  useEffect(() => {
    const timeId = setInterval(() => setDate(Date.now()), 1000);
    return () => clearInterval(timeId);
  }, []);

  const removeClock = () => {
    setTimes(times.filter(item => item.title !== title))
  }

  return (
    <div className='clock'>
      <h3 className="clock__title">{title}</h3>
      <button
        className="clock__close"
        onClick={removeClock}
      >&#10008;</button>
      <div className="clock__wrapper">
        <div
          className="clock__hour"
          ref={hourEl}
          style={{transform: `rotate(${hourDeg}deg)`}}
        ></div>
        <div
          className="clock__minute"
          ref={minEl}
          style={{transform: `rotate(${minDeg}deg)`}}
        ></div>
        <div
          className="clock__second"
          ref={secEl}
          style={{transform: `rotate(${secDeg}deg)`}}
        ></div>
      </div>
      <div className="clock__num">
        {`${hour} : ${min} : ${sec}`}
      </div>
    </div>
  )
}

export default Clock