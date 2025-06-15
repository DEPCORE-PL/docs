let countdownDate;
let timerInterval;

const daysElem = document.getElementById("days"),
    hoursElem = document.getElementById("hours"),
    minutesElem = document.getElementById("minutes"),
    secondsElem = document.getElementById("seconds"),
    timer = document.getElementById("timer");

function startCountdown() {
    const now = new Date().getTime();
    const countdown = new Date(countdownDate).getTime();

    const difference = (countdown - now) / 1000;

    if (difference < 1) {
        endCountdown();
    }

    let days = Math.floor(difference / (60 * 60 * 24));
    let hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((difference % (60 * 60)) / 60);
    let seconds = Math.floor(difference % 60);

    daysElem.innerHTML = days;
    hoursElem.innerHTML = hours;
    minutesElem.innerHTML = minutes;
    secondsElem.innerHTML = seconds;
}

function endCountdown() {
    clearInterval(timerInterval);
    timer.remove();
}

export function initCountdown() {
    countdownDate = document.getElementById("timer").getAttribute("data-date");
    startCountdown();
    timerInterval = setInterval(startCountdown, 1000);
}
