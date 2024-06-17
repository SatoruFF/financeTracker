var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// middlewares
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.get('/', (_, res) => {
    res.send("keep alive");
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(port, () => {
            console.log(`⚡️[server]: 🚀 Server is running at: ${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
start();
//# sourceMappingURL=app.js.map