import { Server } from "socket.io";
import { fightController } from "../controllers/fightController.js";

export class WebsocketManager {
  constructor() {
    this.clients = new Map();
    this.io;
  }

  setupWebSocketServer(server) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
      },
    });

    this.io.on("connection", (socket) => {
      const channel = socket.handshake.query.channel;

      if (!channel) {
        console.error("Aucun ID de client trouvé dans l'URL.");
        socket.disconnect();
        return;
      }

      socket.join(channel);
      this.clients.set(channel, socket);

      console.log(`Nouvelle connexion WebSocket établie. ID: ${channel}`);

      socket.on("message", (message) => {
        if (message.action === "onAttack") {
          let newHealth = fightController.handleOnAttack(channel);

          this.broadcast({
            action: "healthUpdate",
            health: newHealth,
          });
        }
      });

      socket.on("disconnect", () => {
        this.clients.delete(channel);
        console.log(`Connexion WebSocket fermée. ID: ${channel}`);
      });
    });
  }

  broadcast(data) {
    if (!this.io) {
      console.error(`You must use setupWebSocketServer() before`);
      return;
    }
    this.io.emit("message", data);
  }

  sendMessageToClient(channel, data) {
    if (!this.io) {
      console.error(`You must use setupWebSocketServer() before`);
      return;
    }
    this.io.to(channel).emit("message", data);
  }
}

export const websocketManager = new WebsocketManager();
