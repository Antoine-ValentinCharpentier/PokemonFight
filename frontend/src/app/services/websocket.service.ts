import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'; 

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: Socket | undefined;
  messageCallback: ((data: any) => void) | undefined;

  constructor() {}

  connect(channel: string, callback: (data: any) => void) {
    this.messageCallback = callback;
    
    this.socket = io('http://localhost:3000', {
      query: { channel: channel } 
    });

    this.socket.on('connect', () => {
      console.log(`Connexion Socket.IO ouverte sur le canal ${channel}.`);
    });

    this.socket.on('message', (data: any) => {
      if (this.messageCallback) {
        this.messageCallback(data);
      }
    });

    this.socket.on('disconnect', () => {
      console.log(`Connexion Socket.IO fermée sur le canal ${channel}.`);
    });
  }

  sendMessage(message: any) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('message', message);
    } else {
      console.error('La connexion Socket.IO n\'est pas ouverte.');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
