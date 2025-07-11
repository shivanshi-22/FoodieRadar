// server/index.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { Server } = require("socket.io");

// Import GraphQL schema
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers/index.js");


// App and HTTP setup
const app = express();
app.use(cors());
const httpServer = http.createServer(app);

// 🔌 Socket.IO Setup
const io = new Server(httpServer, {
  cors: { origin: "*" },
});
require("./sockets/socketHandler")(io); // Modular socket logic

// 🔧 GraphQL Setup
const server = new ApolloServer({ typeDefs, resolvers });
async function start() {
  await server.start();
  server.applyMiddleware({ app });

  // 🛢️ MongoDB
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/foodieradar")
    .then(() => console.log("MongoDB Connected"))
    .catch(console.error);

  // 🟢 Start server
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () =>
    console.log(`🚀 Server at http://localhost:${PORT}${server.graphqlPath}`)
  );
}
start();
