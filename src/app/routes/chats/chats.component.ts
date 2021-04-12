import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Friend, User, UserResponse } from 'src/app/interfaces';
import { MessageStructure } from 'src/app/interfaces/chat.interfaces';
import { ChatService } from 'src/app/services/messages/chat.service';
import { SocketService } from 'src/app/services/sockets/socket.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  constructor(private userService: UserService, private socketService: SocketService, private chatService: ChatService) {}
  friends: BehaviorSubject<Friend[]> = new BehaviorSubject<Friend[]>([]);
  messages: BehaviorSubject<MessageStructure[]> = new BehaviorSubject<MessageStructure[]>([]);
  selectedFriend: Friend | null = null;
  currentUser: User | null = null;


  ngOnInit(): void {
    this.userService.forceGetUser().subscribe((user: UserResponse) => {
      if (user) {
        this.friends.next(user.user.friends);
        this.selectedFriend = this.friends.value[0]
        this.userService.currntUser.next(user.user);
        this.currentUser = user.user;

        this.chatService.messages.subscribe((messages: MessageStructure[]) => {
          this.messages.next(messages)
        });
      }
    });
  }

  chatSelected(event: Friend): void {
    this.selectedFriend = event;
    // Need to query messages here, scroll to bottom
    console.log(event)
  }

  sendMessage(message: string): void {
    const senderID = this.currentUser ? this.currentUser.id : 0;
    const receiverID = this.selectedFriend && this.selectedFriend.friendID ? this.selectedFriend.friendID : 0;
    this.socketService.sendMessage(message, senderID, receiverID);
  }
}
