import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { User } from './interfaces';
import { ChatService } from './services/messages/chat.service';
import { SocketService } from './services/sockets/socket.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private userService: UserService, private socketService: SocketService, private chatService: ChatService) {

  }
  isLoggedIn = false;

  ngOnInit(): void {
    this.socketService.connect();
    this.userService.getUser().subscribe((user: User | null) => {
      if(user) {
        this.isLoggedIn = true;
        this.chatService.loadInitialMessages()
      }
    });



    // This is where we will listen to all of the socket events
    //  When we receieve an event, we will call through to a state service that will manage our data

    this.socketService.socket.on('connect', (data: any) => {
      console.log(data);
    })

    this.socketService.socket.on('message', (data: any) => {
      this.chatService.addChat(data.message)
    })
  }
}
