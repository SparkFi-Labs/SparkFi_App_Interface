import { add, assign, indexOf, map, sortBy } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const daysOfWeek = ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"];
const monthsOfYear = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];

const hoursInDay = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const minutesInHour = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
];
const secondsInMinute = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
];

interface CalendarProps {
  date?: Date | number | string;
  onDateChange?: (date: Date) => any;
}

const Clock = () => {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setSecond(date.getSeconds());
      setHour(date.getHours());
      setMinute(date.getMinutes());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-32 h-32 py-1 px-1 overflow-hidden rounded-full bg-[#0c0e1e] border-[7px] border-[#131735] shadow-[-4px_-4px_10px_rgba(67,_67,_67,_0.5),_inset_4px_4px_10px_rgba(0,_0,_0,_0.5),_inset_-4px_-4px_10px_rgba(67,_67,_67,_0.5),_4px_4px_10px_rgba(0,_0,_0,_0.3)] relative flex justify-center items-start">
      <div className="relative overflow-hidden h-full w-full rounded-full bg-[#131735]">
        <div className="absolute left-[50%] h-full w-0.5 z-0 bg-[#0029ff]"></div>
        <div className="absolute top-[50%] w-full h-0.5 z-0 bg-[#0029ff]"></div>
        <div className="absolute top-[50%] rotate-[30deg] w-full h-0.5 z-0 bg-[#fff]"></div>
        <div className="absolute top-[50%] rotate-[60deg] w-full h-0.5 z-0 bg-[#fff]"></div>
        <div className="absolute top-[50%] rotate-[120deg] w-full h-0.5 z-0 bg-[#fff]"></div>
        <div className="absolute top-[50%] rotate-[150deg] w-full h-0.5 z-0 bg-[#fff]"></div>
        <div className="absolute overflow-hidden h-[80%] w-[80%] rounded-full bg-[#131735] top-[10%] left-[10%]">
          <div className="absolute z-[11] left-[49%] top-[49%] w-4 h-4 rounded-full bg-[#fff] -mt-[6px] -ml-[9px]"></div>
          <div
            className="w-[30%] bg-primary top-[50%] right-[50%] h-[6px] z-[3] absolute rounded-[6px] origin-[100%] rotate-90 ease-in-out"
            style={{ transform: `rotate(${(hour / 12) * 360 + (minute / 60) * 30 + (second / 60) * 0.5 + 90}deg)` }}
          ></div>
          <div
            className="w-[40%] bg-info top-[50%] right-[50%] h-[3px] z-[10] absolute rounded-[6px] origin-[100%] rotate-90 ease-in-out"
            style={{ transform: `rotate(${(minute / 60) * 360 + (second / 60) * 6 + 90}deg)` }}
          ></div>
          <div
            className="w-[45%] bg-accent top-[50%] right-[50%] h-[2px] z-[10] absolute rounded-[6px] origin-[100%] rotate-90 ease-in-out"
            style={{
              transform: `rotate(${(second / 60) * 360 + 90}deg)`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function Calendar({ date, onDateChange }: CalendarProps) {
  const [currentSelectedDate, setCurrentSelectedDate] = useState(1);
  const [currentSelectedMonth, setCurrentSelectedMonth] = useState(0);
  const [currentSelectedYear, setCurrentSelectedYear] = useState(1998);

  const [currentSelectedHour, setCurrentSelectedHour] = useState(0);
  const [currentSelectedMinute, setCurrentSelectedMinute] = useState(0);
  const [currentSelectedSecond, setCurrentSelectedSecond] = useState(0);

  const paramsAsDateObject = useMemo(
    () =>
      new Date(
        currentSelectedYear,
        currentSelectedMonth,
        currentSelectedDate,
        currentSelectedHour,
        currentSelectedMinute,
        currentSelectedSecond
      ),
    [
      currentSelectedDate,
      currentSelectedHour,
      currentSelectedMinute,
      currentSelectedMonth,
      currentSelectedSecond,
      currentSelectedYear
    ]
  );
  const datesOfDaysOfWeekInSelectedMonth = useMemo(() => {
    const d: Date = new Date(currentSelectedYear, add(currentSelectedMonth, 1), 0);
    let x: { [dayOfTheWeek: number]: number[] } = {};

    for (let i = 1; i <= d.getDate(); i++) {
      const innerD = new Date(d.getFullYear(), d.getMonth(), i);
      x = assign(x, { [innerD.getDay()]: [...(x[innerD.getDay()] || []), i] });
    }
    return x;
  }, [currentSelectedMonth, currentSelectedYear]);
  const yearsFrom1970 = useMemo(() => {
    const years: number[] = [];
    const currentDate = new Date(Date.now());

    for (let i = 1970; i <= currentDate.getFullYear() + 1000; i++) years.push(i);

    return years;
  }, []);

  const monthsDropDownRef = useRef<HTMLDetailsElement>(null);
  const yearsDropDownRef = useRef<HTMLDetailsElement>(null);

  const hoursDropdownRef = useRef<HTMLDetailsElement>(null);
  const minutesDropdownRef = useRef<HTMLDetailsElement>(null);
  const secondsDropdownRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (date) {
      let d: Date;

      if (typeof date === "number" || typeof date === "string") d = new Date(date);
      else d = date;

      setCurrentSelectedDate(d.getDate());
      setCurrentSelectedMonth(d.getMonth());
      setCurrentSelectedYear(d.getFullYear());
      setCurrentSelectedHour(d.getHours());
      setCurrentSelectedMinute(d.getMinutes());
      setCurrentSelectedSecond(d.getSeconds());
    }
  }, [date]);
  return (
    <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start gap-3 max-w-xl bg-[#0c0e1e] border border-[#131735] rounded-[8px] shadow-xl absolute top-[50%] lg:left-[50%] z-30">
      <div className="flex flex-col justify-start items-start py-3 px-2 text-[#fff] border-b lg:border-b-0 lg:border-r border-[#131735] h-full">
        <div className="flex justify-between items-center w-full">
          <details ref={monthsDropDownRef} className="dropdown relative">
            <summary className="capitalize text-[0.76em] btn btn-ghost btn-square btn-sm px-1 py-1 w-full font-inter">
              {monthsOfYear[paramsAsDateObject.getMonth()]} {paramsAsDateObject.getFullYear()}
            </summary>
            <ul className="p-2 menu shadow-xl dropdown-content z-[1] bg-base-100 rounded-box w-52 h-52 overflow-auto">
              {map(monthsOfYear, (month, index) => (
                <li key={index}>
                  <a
                    onClick={() => {
                      setCurrentSelectedMonth(index);
                      setCurrentSelectedDate(1);

                      if (monthsDropDownRef.current) monthsDropDownRef.current.open = false;
                    }}
                    className={`capitalize ${
                      currentSelectedMonth === index ? "bg-primary text-primary-content" : ""
                    } font-inter`}
                  >
                    {month}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <details ref={yearsDropDownRef} className="dropdown relative">
            <summary className="btn btn-ghost btn-square btn-sm text-[0.76em] px-1 py-1 w-full font-inter">
              {currentSelectedYear}
            </summary>
            <ul className="p-2 menu shadow-xl dropdown-content z-[1] bg-base-100 rounded-box w-52 h-52 overflow-auto">
              {map(yearsFrom1970, (year, index) => (
                <li key={index}>
                  <a
                    className={`${currentSelectedYear === year ? "bg-primary text-primary-content" : ""} font-inter`}
                    onClick={() => {
                      setCurrentSelectedYear(year);
                      setCurrentSelectedMonth(0);
                      setCurrentSelectedDate(1);

                      if (yearsDropDownRef.current) yearsDropDownRef.current.open = false;
                    }}
                  >
                    {year}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => {
                if (currentSelectedMonth <= 0) {
                  setCurrentSelectedMonth(11);
                  setCurrentSelectedYear(y => y - 1);
                } else setCurrentSelectedMonth(m => m - 1);
                setCurrentSelectedDate(1);
              }}
              className="btn btn-circle btn-sm btn-ghost flex justify-center items-center px-1 py-1 text-[#fff] text-[0.92em] font-inter"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => {
                if (currentSelectedMonth >= 11) {
                  setCurrentSelectedMonth(0);
                  setCurrentSelectedYear(y => y + 1);
                  setCurrentSelectedDate(1);
                } else setCurrentSelectedMonth(m => m + 1);

                setCurrentSelectedDate(1);
              }}
              className="btn btn-sm btn-ghost btn-circle flex justify-center items-center px-1 py-1 text-[#fff] text-[0.92em] font-inter"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-start gap-2 w-full overflow-auto">
          {map(
            sortBy(daysOfWeek, day => datesOfDaysOfWeekInSelectedMonth[indexOf(daysOfWeek, day)][0]).map(name => ({
              name,
              id: indexOf(daysOfWeek, name)
            })),
            (day, index) => (
              <div key={index} className="flex gap-2 flex-col w-1/6 justify-start items-center">
                <span className="text-[0.94em] capitalize font-inter">{day.name}</span>
                {datesOfDaysOfWeekInSelectedMonth[day.id] &&
                  map(datesOfDaysOfWeekInSelectedMonth[day.id], (dt, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSelectedDate(dt)}
                      className={`text-[0.84em] font-inter flex justify-center items-center btn btn-circle btn-sm ${
                        dt === currentSelectedDate ? "btn-primary btn-active" : "btn-ghost"
                      }`}
                    >
                      {dt}
                    </button>
                  ))}
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center gap-4 px-3 py-3 max-h-64">
        <Clock />
        <div className="w-full flex justify-between items-center gap-2 h-[80%]">
          <details ref={hoursDropdownRef} className="dropdown dropdown-end mb-1 relative">
            <summary className="btn btn-neutral btn-sm flex justify-center items-center btn-square font-inter">
              {currentSelectedHour}
            </summary>
            <ul className="p-2 menu shadow-xl dropdown-content z-50 bg-base-100 rounded-box w-52 h-64 overflow-auto absolute">
              {map(hoursInDay, (hour, index) => (
                <li key={index}>
                  <a
                    className="font-inter"
                    onClick={() => {
                      setCurrentSelectedHour(hour);

                      if (hoursDropdownRef.current) hoursDropdownRef.current.open = false;
                    }}
                  >
                    {hour}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <details ref={minutesDropdownRef} className="dropdown dropdown-end mb-1 relative">
            <summary className="btn btn-neutral btn-sm flex justify-center items-center btn-square font-inter">
              {currentSelectedMinute}
            </summary>
            <ul className="p-2 menu shadow-xl dropdown-content z-50 bg-base-100 rounded-box w-52 h-64 overflow-auto absolute">
              {map(minutesInHour, (minute, index) => (
                <li key={index}>
                  <a
                    className="font-inter"
                    onClick={() => {
                      setCurrentSelectedMinute(minute);

                      if (minutesDropdownRef.current) minutesDropdownRef.current.open = false;
                    }}
                  >
                    {minute}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <details ref={secondsDropdownRef} className="dropdown dropdown-end mb-1 relative">
            <summary className="btn btn-neutral btn-sm flex justify-center items-center btn-square font-inter">
              {currentSelectedSecond}
            </summary>
            <ul className="p-2 menu shadow-xl dropdown-content z-50 bg-base-100 rounded-box w-52 h-64 overflow-auto absolute">
              {map(secondsInMinute, (seconds, index) => (
                <li key={index}>
                  <a
                    className="font-inter"
                    onClick={() => {
                      setCurrentSelectedSecond(seconds);

                      if (secondsDropdownRef.current) secondsDropdownRef.current.open = false;
                    }}
                  >
                    {seconds}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <div className="flex w-full justify-end items-center">
          <button
            onClick={() => onDateChange && onDateChange(paramsAsDateObject)}
            className="btn btn-sm btn-circle btn-ghost text-[#fff] capitalize flex justify-center items-center font-inter"
          >
            ok
          </button>
        </div>
      </div>
    </div>
  );
}
