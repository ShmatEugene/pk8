import React from 'react';

const Countdown = (props) => {
  const timeDifference = props.countdownDate - Date.now(); // ms
  const [days, setDays] = React.useState(Math.trunc(timeDifference / (1000 * 60 * 60 * 24))); // ms to days
  const [hours, setHours] = React.useState(Math.trunc(timeDifference / (1000 * 60 * 60)) % 24); // ms to hours
  const [minutes, setMinutes] = React.useState(Math.trunc(timeDifference / (1000 * 60)) % 60); // ms to minutes
  const [seconds, setSeconds] = React.useState(Math.trunc(timeDifference / 1000) % 60); // ms to seconds

  //1 sec interval to countdown initial date
  React.useEffect(() => {
    let counterInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0 && minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      if (seconds === 0 && minutes === 0 && hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
      if (seconds === 0 && minutes === 0 && hours === 0 && days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      }
      if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
        clearInterval(counterInterval);
      }
    }, 1000);
    return () => {
      clearInterval(counterInterval);
    };
  });
  return (
    <section className="countdown wrapper-fw sh-bg">
      <div className="wrapper">
        <div className="countdown__inner">
          <h2 className="countdown__header">18 апреля пройдет день открытых дверей</h2>
          <div className="countdown__location">
            <i className="fi-rr-marker"></i>
            город Москва, 1-й Боткинский проезд, дом 7А
          </div>
          <div className="countdown__timer">
            <div className="countdown__item">
              <div className="countdown__counter">{days}</div>
              <div className="countdown__label">Дней</div>
            </div>
            <div className="countdown__item">
              <div className="countdown__counter">{hours < 10 ? `0${hours}` : hours}</div>
              <div className="countdown__label">Часов</div>
            </div>
            <div className="countdown__item">
              <div className="countdown__counter">{minutes < 10 ? `0${minutes}` : minutes}</div>
              <div className="countdown__label">Минут</div>
            </div>
            <div className="countdown__item">
              <div className="countdown__counter">{seconds < 10 ? `0${seconds}` : seconds}</div>
              <div className="countdown__label">Секунд</div>
            </div>
          </div>
          <div className="countdown__date">12:00 16 апреля, 2021</div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
