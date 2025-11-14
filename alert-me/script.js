/*document.addEventListener("DOMContentLoaded", () => {
    const currentTimeElement = document.getElementById("current-time");
    const alarmsList = document.getElementById("alarms");
    const alarmSound = document.getElementById("alarmSound");

    // Load alarms from localStorage
    let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

    function updateTime() {
        let now = new Date();
        let timeString = now.toLocaleTimeString();
        currentTimeElement.textContent = timeString;

        // Check Alarms
        alarms.forEach((alarm, index) => {
            if (alarm.time === timeString) {
                triggerAlarm(alarm, index);
            }
        });

        setTimeout(updateTime, 1000);
    }

    // Fix 1: Make setAlarm globally accessible
    window.setAlarm = function () {
        let alarmTime = document.getElementById("alarmTime").value;
        let alarmLabel = document.getElementById("alarmLabel").value || "Alarm";

        if (!alarmTime) {
            alert("Please set a valid alarm time.");
            return;
        }

        let formattedTime = new Date().toLocaleDateString() + " " + alarmTime;
        alarms.push({ time: new Date(formattedTime).toLocaleTimeString(), label: alarmLabel });

        localStorage.setItem("alarms", JSON.stringify(alarms));
        renderAlarms();
    };

    function renderAlarms() {
        alarmsList.innerHTML = "";
        alarms.forEach((alarm, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${alarm.label} - ${alarm.time} 
                <button onclick="removeAlarm(${index})">Delete</button>`;
            alarmsList.appendChild(li);
        });
    }

    function removeAlarm(index) {
        alarms.splice(index, 1);
        localStorage.setItem("alarms", JSON.stringify(alarms));
        renderAlarms();
    }

    function triggerAlarm(alarm, index) {
        if (Notification.permission === "granted") {
            new Notification("Alarm", { body: alarm.label });
        }

        alarmSound.play();
        let userChoice = confirm(`ALARM: ${alarm.label} \nDo you want to snooze for 5 min?`);

        if (userChoice) {
            snoozeAlarm(index);
        } else {
            stopAlarm(index);
        }
    }

    function snoozeAlarm(index) {
        let snoozeTime = new Date(new Date().getTime() + 5 * 60000);
        alarms[index].time = snoozeTime.toLocaleTimeString();
        localStorage.setItem("alarms", JSON.stringify(alarms));
        renderAlarms();
    }

    function stopAlarm(index) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        removeAlarm(index);
    }

    // Fix 2: Request Notification Permission Only If Not Denied
    if (Notification.permission !== "denied" && Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notifications enabled");
            } else {
                console.log("Notifications denied by user");
            }
        });
    }

    updateTime();
    renderAlarms();
});

second
let alarms = [];

document.addEventListener("DOMContentLoaded", function () {
    updateTime();
    setInterval(updateTime, 1000);
});

function updateTime() {
    const now = new Date();
    document.getElementById("current-time").innerText = now.toLocaleTimeString();
    checkAlarms();
}

// 🛠 Fix: Store alarms in an array & properly remove them
function setAlarm() {
    const alarmTime = document.getElementById("alarm-time").value;
    const alarmLabel = document.getElementById("alarm-label").value || "Alarm! ⏰";

    if (!alarmTime) return alert("Please set a valid time!");

    const alarm = { time: alarmTime, label: alarmLabel };
    alarms.push(alarm);
    renderAlarms();
}

// 🛠 Fix: Update UI and remove alarm correctly
function deleteAlarm(index) {
    alarms.splice(index, 1);
    renderAlarms();
}

function renderAlarms() {
    const alarmList = document.getElementById("alarms");
    alarmList.innerHTML = "";
    alarms.forEach((alarm, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${alarm.label} - ${alarm.time} 
            <button class="delete-btn" onclick="deleteAlarm(${index})">Delete</button>`;
        alarmList.appendChild(li);
    });
}

function checkAlarms() {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

    alarms.forEach((alarm, index) => {
        if (alarm.time === currentTime) {
            playAlarm(alarm.label);
            deleteAlarm(index);
        }
    });
}

// 🛠 Fix: Play soft anime-styled alarm sound (Use your own MP3 file)
function playAlarm(label) {
    let audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3");
    audio.play();

    if (Notification.permission === "granted") {
        new Notification(label);
    } else {
        alert(label);
    }
}

// Request Notification Permission
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});
*/
let alarms = [];
let alarmAudio = new Audio("sounds/alarm.mp3"); // Set your custom alarm file path
alarmAudio.volume = 1.0; // Full volume

document.addEventListener("DOMContentLoaded", function () {
    updateTime();
    setInterval(updateTime, 1000);
});

function updateTime() {
    const now = new Date();
    document.getElementById("current-time").innerText = now.toLocaleTimeString();
    checkAlarms();
}

// Set Alarm Function
function setAlarm() {
    const alarmTime = document.getElementById("alarm-time").value;
    const alarmLabel = document.getElementById("alarm-label").value || "Alarm! ⏰";

    if (!alarmTime) return alert("Please set a valid time!");

    const alarm = { time: alarmTime, label: alarmLabel };
    alarms.push(alarm);
    renderAlarms();
}

// Delete Alarm Function
function deleteAlarm(index) {
    alarms.splice(index, 1);
    renderAlarms();
}

function renderAlarms() {
    const alarmList = document.getElementById("alarms");
    alarmList.innerHTML = "";
    alarms.forEach((alarm, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${alarm.label} - ${alarm.time} 
            <button class="delete-btn" onclick="deleteAlarm(${index})">Delete</button>`;
        alarmList.appendChild(li);
    });
}

// Check if any alarm matches current time
function checkAlarms() {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

    alarms.forEach((alarm, index) => {
        if (alarm.time === currentTime) {
            playAlarm(alarm.label);
            deleteAlarm(index);
        }
    });
}

// 🔔 Play Alarm Function (Now Fully Functional)
function playAlarm(label) {
    let alarmAudio = new Audio("https://www.fesliyanstudios.com/play-mp3/4381");
    alarmAudio.play(); // Plays your custom sound file

    if (Notification.permission === "granted") {
        new Notification(label);
    } else {
        alert(label);
    }

    // Show Snooze & Stop Buttons
    setTimeout(() => {
        let snooze = confirm(`${label}\nDo you want to snooze for 5 minutes?`);
        if (snooze) {
            let snoozeTime = new Date();
            snoozeTime.setMinutes(snoozeTime.getMinutes() + 5);
            let newAlarmTime = snoozeTime.getHours().toString().padStart(2, "0") + ":" + snoozeTime.getMinutes().toString().padStart(2, "0");
            alarms.push({ time: newAlarmTime, label: "Snoozed Alarm ⏰" });
            renderAlarms();
        } else {
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
        }
    }, 2000); // Ask user after 2 seconds
}

// Request Notification Permission
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

