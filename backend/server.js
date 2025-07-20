import express from 'express';
import os from 'node:os';
import cluster from 'node:cluster';
import dotenv from 'dotenv';
import cors from "cors"
import dbConnection from './src/configs/db.js';
import postRoutes from "./src/routes/post.js"
import authRoutes from "./src/routes/auth.js"
import cookieParser from "cookie-parser"

dotenv.config();

const cpuCount = os.cpus().length;
const PORT = process.env.PORT || 8080;



if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork a worker for each CPU core
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }


  cluster.on('exit', (worker, code, signal) => {
    console.warn(`Worker ${worker.process.pid} died. Spawning a new one...`);
    cluster.fork();
  });
} else {
  dbConnection()

  const app = express();
  app.use(express.json());
  app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


  app.get('/', (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });
  
  app.use("/api/v1/post",postRoutes)
  app.use("/api/v1/auth",authRoutes)

  app.listen(PORT, () => {
    console.log(`🚀 Worker ${process.pid} listening on port ${PORT}`);
  });
}


