import http from 'http';
import app from './app.js';
import { websocketManager } from './websockets/websocketManager.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
websocketManager.setupWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
