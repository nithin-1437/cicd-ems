const { LocalStorage } = require("node-localstorage");
global.localStorage = new LocalStorage("./scratch"); // folder for server-side storage
