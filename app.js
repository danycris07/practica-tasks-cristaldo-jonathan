import "dotenv/config"
import express, { Router } from "express"

import { startDB } from "./src/config/database.js";

import { TaskRouter } from "./src/routes/task.routes.js";
import { UserRouter } from "./src/routes/user.routes.js";

const PORT = process.env.PORT
const app = express()
app.use(express.json())

app.use("/api/task", TaskRouter )
app.use("/api/user", UserRouter)


app.listen(PORT, async () => {
        await startDB()
        console.log("Server corriendo en puerto: ", PORT);
   
})
