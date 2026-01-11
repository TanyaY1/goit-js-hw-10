import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("[data-start]");
const datePicker = document.querySelector("#datetime-picker");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let selectedDate = null;
let timerId = null;


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}


flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const now = new Date();
    const pickedDate = selectedDates[0];

    if (pickedDate <= now) {
      startBtn.disabled = true;
      selectedDate = null;

      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
      });
    } else {
      selectedDate = pickedDate;
      startBtn.disabled = false;
    }
  },
});


function updateTimer() {
  const now = new Date();
  const ms = selectedDate - now;

  if (ms <= 0) {
    clearInterval(timerId);

    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    datePicker.disabled = false;
    startBtn.disabled = true;
    selectedDate = null;

    return;
  }

  const { days, hours, minutes, seconds } = convertMs(ms);

  daysEl.textContent = days; 
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  datePicker.disabled = true;

  updateTimer();
  timerId = setInterval(updateTimer, 1000);
});
