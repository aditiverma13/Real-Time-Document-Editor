// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./config/db.js";
// import authRouter from "./routes/auth.routes.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import userRouter from "./routes/user.routes.js";
// import geminiResponse from "./gemini.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173", // frontend URL
//     credentials: true,
//   })
// );

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);

// // Optional: test route
// app.get("/", async (req, res) => {
//   try {
//     const prompt = req.query.prompt;
//     const data = await geminiResponse(prompt);
//     res.json(data);
//   } catch (error) {
//     console.error("Error in / route:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Start server
// app.listen(port, () => {
//   connectDb();
//   console.log(`Server started on port ${port}`);
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import documentRouter from "./routes/documentRoutes.js";
import socketHandler from "./socket/socketHandler.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // Required for socket

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Connect Database FIRST
connectDb();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);      // Gemini routes can stay here
app.use("/api/documents", documentRouter);

// Socket handler
socketHandler(io);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



