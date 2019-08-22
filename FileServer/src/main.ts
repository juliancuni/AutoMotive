import express from 'express';
import http from "http";
import helmet from 'helmet';
import cors from 'cors';
import bodyparser from 'body-parser';
import { LoggerMiddleWare } from './middlewares/logger.middleware';
import { Routes } from './controllers/routes.controller'
import { AuthGuard } from './middlewares/auth.middleware';
import mongoose from 'mongoose';
import { AppConfig } from './app.config';
import cookieParser from 'cookie-parser';

const app = express();
const appCfg = new AppConfig;

app.use(helmet());

app.use(cors({origin: 'http://localhost:4200', credentials: true}));
app.use(bodyparser.json());
app.use(LoggerMiddleWare);
app.use(cookieParser());
app.use(AuthGuard);
Routes(app);

const server: http.Server = app.listen(appCfg.APP_PORT);

server.on("listening", async () => {
    console.info(`Server Gati! http://localhost:${appCfg.APP_PORT}`);
    mongoose.connect(appCfg.MONGO_URI, appCfg.MONGO_OPTIONS)
    mongoose.connection.on('open', () => { console.log("MongoDBConnected!") });
    mongoose.connection.on('error', (err) => { console.log(err) });
})

export { server }