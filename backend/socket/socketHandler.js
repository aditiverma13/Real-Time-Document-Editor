import Document from "../models/Document.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ User Connected:", socket.id);

    socket.on("join-document", (documentId) => {
      socket.join(documentId);

      const room = io.sockets.adapter.rooms.get(documentId);
      io.to(documentId).emit("update-users", room?.size || 1);
    });

    socket.on("send-changes", async ({ documentId, content }) => {
      socket.to(documentId).emit("receive-changes", content);

      // Save to database
      await Document.findByIdAndUpdate(documentId, {
        content,
        updatedAt: new Date()
      });
    });

    socket.on("leave-document", (documentId) => {
      socket.leave(documentId);
    });

    socket.on("disconnect", () => {
      console.log("❌ User Disconnected:", socket.id);
    });
  });
};

export default socketHandler;
