import path from "path";
const CONFIG = new Map();
CONFIG.set("port", 3000);
CONFIG.set("staticDir", path.join(__dirname, "..", "public"));
CONFIG.set("viewsDir", path.join(__dirname, "..", "views"));

export default CONFIG;
