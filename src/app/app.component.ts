import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { User, UserResponse } from './interfaces';
import { ChatService } from './services/messages/chat.service';
import { SocketService } from './services/sockets/socket.service';
import { UserService } from './services/user/user.service';
import { sortMessagesByReceiver } from './utils/message.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private chatService: ChatService
  ) {}
  isLoggedIn = false;

  ngOnInit(): void {
    this.socketService.connect();
    this.userService.getUser().subscribe((user: User | null) => {
      if (user) {
        this.isLoggedIn = true;
      }
    });

    // This is where we will listen to all of the socket events
    //  When we receieve an event, we will call through to a state service that will manage our data

    this.socketService.socket.on('connect', (data: any) => {
      if(data) {
        this.userService.setUser(data.userInfo);
        const messageStruct = sortMessagesByReceiver(data.messages, data.userInfo.user.id);
        this.chatService.setMessages(messageStruct);
      }
    });

    this.socketService.socket.on('message', (data: any) => {
      this.chatService.addChat(data.message);
    });

    this.socketService.socket.on('groupmessage', (data: any) => {
        this.chatService.addGroupChat(data.message);
    });

    this.socketService.socket.on('friend', (data: any) => {
      this.socketService.join_room(data.friend.id);
    });
  }
}
