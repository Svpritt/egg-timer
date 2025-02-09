const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
    // Кнопки управления окном
    document.querySelectorAll("[data-ipc-event]").forEach(button => {
        button.addEventListener("click", () => {
            const event = button.getAttribute("data-ipc-event");
            ipcRenderer.send(event);
        });
    });

    // Логика таймера
    const eggType = localStorage.getItem("eggType");
    let timeLeft = parseInt(localStorage.getItem("eggTime"), 10);

    if (!eggType || isNaN(timeLeft)) return; // Предотвращаем ошибку

    const timerText = document.getElementById("timer-text");
    const container = document.querySelector(".container");
    const timerBox = document.querySelector(".timer-box");
    const alarmSound = new Audio(`sounds/${eggType}.mp3`);

    function updateTimer() {
        if (timeLeft > 0) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerText.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            timerFinished();
        }
    }

    function timerFinished() {
        timerText.textContent = "Готово!";
        alarmSound.play();

        timerBox.style.display = "none"; // Скрываем таймер

        const backButton = document.createElement("button");
        backButton.textContent = "Готово";
        backButton.classList.add("back-button");
        backButton.onclick = () => {
            window.location.href = "index.html"; // Возвращаемся на главный экран
        };

        const eggImage = document.createElement("img");
        eggImage.src = `assets/${eggType}.png`;
        eggImage.alt = "Ваше яйце готово!";
        eggImage.classList.add("result-image");

        container.appendChild(eggImage);
        container.appendChild(backButton);
    }

    updateTimer(); // Запускаем таймер
});