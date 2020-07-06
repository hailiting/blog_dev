import localConfig from "./config_local";
import prodConfig from "./config_prod";
const CONFIG = process.env.NODE_ENV === "development" ? localConfig : prodConfig;
export default CONFIG;