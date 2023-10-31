import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import * as M from "./middlewares";
import * as R from "./routers";
import cors from "cors";

export const app: Application = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/users", R.userRouter);
app.use("/profile", R.profileRouter);
app.use("/login", R.sessionRouter);
app.use("/announcements", R.anouncementRouter);
app.use("/comments", R.commentRouter);

app.use(M.handleError);
