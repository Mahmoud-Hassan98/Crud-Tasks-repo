import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { jwtDecode } from 'jwt-decode';  

interface JwtPayload {
  sub: string; 
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private stompClient!: Client;
  private userId!: number;

  constructor() {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);  
      this.userId = Number(decoded.sub);
      console.log(this.userId);
      
    }

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`http://localhost:8080/ws?token=${token}`),
      reconnectDelay: 5000,
    });

    this.stompClient.activate();
  }

  subscribeToUserTasks(callback: (task: any) => void): void {
    if (!this.userId) {
      console.error('User ID not found, cannot subscribe.');
      return;
    }
    this.stompClient.onConnect = () => {
this.stompClient.subscribe(`/topic/tasks/${this.userId}`, (message: Message) => {
          const task = JSON.parse(message.body);
          callback(task);
        }
      );
    };
  }
}