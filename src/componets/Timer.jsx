import { useEffect, useState } from "react";

function Timer() {
  const [intervalState, setIntervaleState] = useState();
  const [isRuning, setIsRuning] = useState(false);
  const [birthDay, setBirthDay] = useState();
  const [estimatedLife, setEstimatedLife] = useState();
  const [x, setX] = useState(1000);

  const [totalSeconsLife, setTotalSecondLife] = useState();

  const [seconsLeft, setSeconsLeft] = useState();
  const [minutesLefts, setMinutesLeft] = useState();
  const [hoursLeft, setHoursLeft] = useState();
  const [daysLeft, setDaysLeft] = useState();
  const [yearsLeft, setYearsLeft] = useState();

  const [timeSpend, setTimeSpend] = useState(0);
  const [seconsSpend, setSeconsSpend] = useState(0);
  const [minutesSpend, setMinutesSpend] = useState(0);
  const [hoursSpend, setHoursSpend] = useState(0);
  const [daysSpend, setDaysSpend] = useState(0);
  const [yearsSpend, setYearsSpend] = useState(0);

  const [seconsTimer, setSeconsTimer] = useState(0);
  const [minutesTimer, setMinutesTimer] = useState(0);
  const [hoursTimer, setHoursTimer] = useState(0);
  const [daysTimer, setDaysTimer] = useState(0);
  const [yearsTimer, setYearsTimer] = useState(0);

  useEffect(() => {}, []);

  const handleTimer = (secons, setSecons) => {
    setSecons((prevSecs) => {
      if (prevSecs <= 0) {
        return 59;
      } else {
        return prevSecs - 1;
      }
    });
  };

  const handleHours = (hours, setHours) => {
    setHours((prevHours) => {
      if (prevHours <= 0) {
        return 23;
      } else {
        return prevHours - 1;
      }
    });
  };

  const handleDays = (days, setDays) => {
    setDays((prevDays) => {
      if (prevDays <= 0) {
        return 364;
      } else {
        return prevDays - 1;
      }
    });
  };

  const setTimerValues = () => {
    setSeconsTimer(60 - new Date().getSeconds());
    setMinutesTimer(60 - new Date().getMinutes());
    setHoursTimer(23 - new Date().getHours());
    setDaysTimer(365 - getCurrentDay());
  };

  useEffect(() => {
    console.log("Nacimineto: ", new Date(birthDay).getTime());
    console.log(
      "Años de vida: ",
      (new Date(birthDay).getTime() - new Date().getTime()) /
        1000 /
        60 /
        60 /
        24 /
        365
    );
    if (birthDay && estimatedLife) {
      setSeconsSpend(
        Math.floor((new Date().getTime() - new Date(birthDay).getTime()) / 1000)
      );
      setTotalSecondLife(
        (new Date(
          new Date(birthDay).getTime() +
            1000 * 60 * 60 * 24 * 365 * estimatedLife
        ).getTime() -
          new Date(birthDay).getTime()) /
          1000
      );
    }
  }, [birthDay, estimatedLife]);

  function getCurrentDay() {
    const hoy = new Date();
    const primerDiaDelAnio = new Date(hoy.getFullYear(), 0, 1); // 0 representa enero
    const milisegundosEnUnDia = 24 * 60 * 60 * 1000; // Milisegundos en un día

    const diferenciaEnDias =
      Math.floor((hoy - primerDiaDelAnio) / milisegundosEnUnDia) + 1;
    return diferenciaEnDias;
  }

  function parserNumber(numero) {
    if(!numero) return
    const opciones = {
      style: "decimal",
      useGrouping: true,
    };

    return numero.toLocaleString(undefined, opciones);
  }

  useEffect(() => {
    if (totalSeconsLife) {
      setSeconsLeft(Math.floor(totalSeconsLife - seconsSpend));
      setMinutesLeft(Math.floor((totalSeconsLife - seconsSpend) / 60));
      setHoursLeft(Math.floor((totalSeconsLife - seconsSpend) / 60 / 60));
      setDaysLeft(Math.floor((totalSeconsLife - seconsSpend) / 60 / 60 / 24));
      setYearsLeft(
        Math.floor((totalSeconsLife - seconsSpend) / 60 / 60 / 24 / 365)
      );
    }
  }, [totalSeconsLife]);

  useEffect(() => {
    if (seconsTimer === 0 && isRuning) {
      handleTimer(minutesTimer, setMinutesTimer);
    }
    if (minutesTimer === 0 && seconsTimer === 0 && isRuning) {
      handleHours(hoursTimer, setHoursTimer);
    }
    if (
      hoursTimer === 0 &&
      minutesTimer === 0 &&
      seconsTimer === 0 &&
      isRuning
    ) {
      handleDays(daysTimer, setDaysTimer);
    }
    if (
      daysTimer === 0 &&
      hoursTimer === 0 &&
      minutesTimer === 0 &&
      seconsTimer === 0 &&
      isRuning
    ) {
      setYearsTimer(yearsTimer - 1);
    }
  }, [seconsTimer]);

  return (
    <div style={{ margin: "0 auto" , width:"35%"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "500px",
        }}
      >
        <input
          type="date"
          value={birthDay}
          onChange={(e) => {
            setBirthDay(e.target.value);
          }}
        />
        <input
          placeholder="Estimated life's years"
          value={estimatedLife}
          onChange={(e) => {
            setEstimatedLife(e.target.value);
          }}
        />
        <button
          onClick={() => {
           if(!isRuning){
            setIsRuning(true);
            setTimerValues();
            const interval = setInterval(() => {
              setSeconsLeft((prevSeconsLeft) => prevSeconsLeft - 1);
              setSeconsSpend((prevSecondSpend) => prevSecondSpend + 1);
              handleTimer(seconsTimer, setSeconsTimer);
            }, Number(x));
            setIntervaleState(interval);
           }
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            alert("La vida es un continuo, no se puede parar")
            // setIsRuning(false);
            // clearInterval(intervalState);
          }}
        >
          stop
        </button>
      </div>
      {/* <input onChange={(e)=>{setX(e.target.value)}} value={x}/> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid black",
          padding: "1rem",
          margin: "1rem",
        }}
      >
        <div>
          Timer: {`${yearsLeft}`.length == 1 ? `0${yearsLeft}` : yearsLeft}:
          {`${daysTimer}`.length == 1 ? `0${daysTimer}` : daysTimer}:
          {`${hoursTimer}`.length == 2 ? hoursTimer : `0${hoursTimer}`}:
          {`${minutesTimer}`.length == 2 ? minutesTimer : `0${minutesTimer}`}:
          {`${seconsTimer}`.length == 2 ? seconsTimer : `0${seconsTimer}`}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid black",
          padding: "1rem",
          margin: "1rem",
        }}
      >
        <div>Total secons left: {parserNumber(seconsLeft)}</div>
        <div>Total minutes left: {parserNumber(minutesLefts)}</div>
        <div>Total hours left: {parserNumber(hoursLeft)}</div>
        <div>Total days left: {parserNumber(daysLeft)}</div>
        <div>Total years left: {parserNumber(yearsLeft)}</div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid black",
          padding: "1rem",
          margin: "1rem",
        }}
      >
        <div>Total secons spend: {parserNumber(seconsSpend)}</div>
        <div>
          Total minutes spend: {parserNumber(Math.floor(seconsSpend / 60))}
        </div>
        <div>
          Total hours spend: {parserNumber(Math.floor(seconsSpend / 60 / 60))}
        </div>
        <div>
          Total days spend:{" "}
          {parserNumber(Math.floor(seconsSpend / 60 / 60 / 24))}
        </div>
        <div>
          Total years spend:{" "}
          {parserNumber(Math.floor(seconsSpend / 60 / 60 / 24 / 365))}
        </div>
      </div>
    </div>
  );
}

export default Timer;