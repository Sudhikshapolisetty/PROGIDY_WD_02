let running = false;
let startTime;
let lapTime = 0;
let interval;
let lapCount = 1;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");

function startStop() {
    if (running) {
        clearInterval(interval);
        startStopButton.textContent = "Start";
    } else {
        startTime = Date.now() - lapTime;
        interval = setInterval(updateStopwatch, 10);
        startStopButton.textContent = "Stop";
    }
    running = !running;
}

function reset() {
    clearInterval(interval);
    running = false;
    lapTime = 0;
    lapCount = 1;
    display.textContent = "00:00.00";
    startStopButton.textContent = "Start";
    lapList.innerHTML = "";
}

function lap() {
    if (running) {
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        lapList.appendChild(lapItem);
        lapCount++;
    }
}

function updateStopwatch() {
    const currentTime = Date.now();
    lapTime = currentTime - startTime;
    display.textContent = formatTime(lapTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000 / 10);
    return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, "0");
}
