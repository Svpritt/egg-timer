const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;
let timerWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 400,
        resizable: false, // Запрещаем изменение размера
        frame: false, // Убираем стандартное меню
        transparent: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile("index.html");

    // Если приложение закрыли, удаляем окно
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

// Обработка событий для кнопок "Свернуть" и "Закрыть"
ipcMain.on("window-minimize", () => {
    if (mainWindow) mainWindow.minimize(); // Сворачиваем в док (macOS) или трей (Windows)
    if (timerWindow) timerWindow.minimize(); // Сворачиваем таймерное окно
});

ipcMain.on("window-close", () => {
    if (mainWindow) mainWindow.close(); // Закрываем главное окно
    if (timerWindow) timerWindow.close(); // Закрываем таймерное окно
});

// Завершение работы при закрытии всех окон (для Windows)
app.on("window-all-closed", () => {
    app.quit();
});