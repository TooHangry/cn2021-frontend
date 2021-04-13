import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;

  constructor(private auth: AuthService, private userService: UserService) { 
  
  }

  connect() {
    this.socket = io(`${environment.apiURL}`, {
      // transports: ['websocket'],
      query: {
        auth: this.auth.getToken(),
      },
    });
  }

  sendMessage(message: string, user: number, receiver: number) {
    this.socket.emit('message', {message, userID: user, receiver})
  }

  addFriend(id: number): void {
    this.socket.emit('friend', {friendID: id})
  }

  join_room(id: number): void {
    this.socket.emit('joinroom', {friendID: id})
  }
}
