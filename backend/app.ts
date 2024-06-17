import express, { Express, Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import router from "./src/routes/index.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json())
app.use(cors())
app.use("/api", router)

app.get('/', (_, res: Response) => {
    res.send("keep alive")
})

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`⚡️[server]: 🚀 Server is running at: ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()