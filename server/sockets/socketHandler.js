module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    socket.on("join_room", ({ roomId, username }) => {
      socket.join(roomId);
      io.to(roomId).emit("user_joined", { username });
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};
