import './watch-style.css';
import { useState } from 'react';
import Clock from "../Clock/Clock";
import InputRow from "../InputRow/InputRow";
import { Time } from '../../interfaces/Time';

const Watch = () => {
  const [times, setTimes] = useState<Time[]>([{
    title: 'Гринвич',
    timeZone: 0
  }]);

  const addDefaultClock = () => {
    const newTime: Time = {
      title: `Часы ${times.length + 1}`,
      timeZone: 0 
    };
    setTimes([...times, newTime]);
  };

  return (
    <div className="watch">
      <h1 className='watch__title'>Мировые часы</h1>
      <InputRow times={times} setTimes={setTimes} />
      
      <div className="watch__container">
        {
          times.map(item => <Clock
            key={item.title}
            title={item.title}
            timeZone={item.timeZone}
            times={times}
            setTimes={setTimes}
          />)
        }
      </div>
    </div>
  )
}

export default Watch;
