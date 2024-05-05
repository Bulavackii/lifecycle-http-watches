import { useState } from 'react';
import './input-style.css';
import { Time } from "../../interfaces/Time";

type InputRowProps = {
  times: Time[],
  setTimes: (prev: Time[]) => void
}

const InputRow: React.FC<InputRowProps> = ({ times, setTimes }) => {
  const [inputState, setInputState] = useState<Time>({
    title: '',
    timeZone: 0
  });

  const addTime = () => {
    if (!inputState.title.trim() || !inputState.timeZone) {
      setInputState(prev => ({
        ...prev,
        title: `Clock ${times.length + 1}`,
        timeZone: 0
      }));
    }

    const newTime: Time = {
      title: inputState.title,
      timeZone: inputState.timeZone
    };

    setTimes([...times, newTime]);

    setInputState({
      title: '',
      timeZone: 0
    });
  }

  return (
    <div className="input-row">
      <label>
        <span>Наименование</span>
        <input
          type="text"
          className="input-row__input"
          required
          value={inputState.title}
          onChange={e => setInputState(prev => ({...prev, title: e.target.value}))}
        />
      </label>
      <label>
        <span>Часовой пояс</span>
        <input
          type="number"
          className="input-row__input"
          required
          value={inputState.timeZone}
          onChange={e => setInputState(prev => ({...prev, timeZone: +e.target.value < -11
            ? -11
            : +e.target.value > 14
              ? 14
              : +e.target.value
          }))}
        />
      </label>
      <button
        className="submit"
        onClick={addTime}
      >Добавить</button>
    </div>
  )
}

export default InputRow
