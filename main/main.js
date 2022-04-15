const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const { Menu } = require("electron");
const ContextMenu = require("electron-context-menu");

let mainWindow;

ContextMenu({
    prepend: (defaultActions, params, browserWindow) => [{
            label: "Cut",
            visible: params.mediaType === "none" && params.isEditable,
            click: () => {
                browserWindow.webContents.cut();
            }
        },
        {
            label: "Copy",
            visible: params.mediaType === "none" && params.isEditable,
            click: () => {
                browserWindow.webContents.copy();
            }
        },
        {
            label: "Paste",
            visible: params.mediaType === "none" && params.isEditable,
            click: () => {
                browserWindow.webContents.paste();
            }
        },
        {
            label: "Select All",
            visible: params.mediaType === "none" && params.isEditable,
            click: () => {
                browserWindow.webContents.selectAll();
            }
        },
    ]
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            devTools: false
        },
        title: "Ink Desktop",
        icon: path.join(__dirname, "../icons/icon.png"),
    });
    mainWindow.loadFile("./Ink/index.html");
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") app.quit();
});
app.on("web-contents-created", function(event, contents) {
    if (contents.getType() === "webview") {
        contents.on("new-window", function(newWindowEvent) {
            newWindowEvent.preventDefault();
        });
    }
});

let ver = app.getVersion();

function aboutApp() {
    dialog.showMessageBoxSync({
        title: "About Ink Desktop",
        message: `Ink ${ver}`,
        buttons: ["OK"],
        icon: './icons/icon.png'
    });
}

const template = [{
        label: "About",
        click: function() {
            aboutApp();
        }
    },
    {
        label: "Quit",
        click: function() {
            app.quit();
        }
    }
];


const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);