import "dotenv/config";
import express, { Router } from "express";

import { startDB } from "./src/config/database.js";

import { TaskRouter } from "./src/routes/task.routes.js";
import { UserRouter } from "./src/routes/user.routes.js";
import { ProfileRouter } from "./src/routes/profile.routes.js";
import { TagRouter } from "./src/routes/tag.routes.js";
import "./src/models/relaciones.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api/task", TaskRouter);
app.use("/api/user", UserRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/tag", TagRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log("Server corriendo en puerto: ", PORT);
});
