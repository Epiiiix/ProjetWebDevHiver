import { getTaches } from "./api.js";
import { Application } from "./app.js";

const taches = await getTaches();
let app = new Application(taches);