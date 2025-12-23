import dotenv from "dotenv";
dotenv.config();

import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import Message from "./models/Message.js";

const PORT = 5000;

/* ---------------- CONNECT DB ---------------- */
await connectDB();

/* ---------------- CREATE HTTP SERVER ---------------- */
const server = http.createServer(app);

/* ---------------- SOCKET.IO SETUP ---------------- */
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://doclink-mern.vercel.app"
    ],
    credentials: true
  }
});


/* ---------------- SOCKET AUTH ---------------- */
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

/* ---------------- SOCKET EVENTS ---------------- */
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.user.id);

  socket.on("joinRoom", (appointmentId) => {
    socket.join(appointmentId);
  });

  socket.on("sendMessage", async ({ appointmentId, content }) => {
    const message = await Message.create({
      appointment: appointmentId,
      sender: socket.user.id,
      content
    });

    io.to(appointmentId).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });
});

/* ---------------- START SERVER ---------------- */
server.listen(PORT, () => {
  console.log("🚀 Server + WebSocket running on port", PORT);
});

export { io };
