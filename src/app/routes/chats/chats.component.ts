import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Friend, FriendList, User, UserResponse } from 'src/app/interfaces';
import { Message, MessageStructure } from 'src/app/interfaces/chat.interfaces';
import { ChatService } from 'src/app/services/messages/chat.service';
import { SocketService } from 'src/app/services/sockets/socket.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private chatService: ChatService
  ) {}
  friends: BehaviorSubject<FriendList[]> = new BehaviorSubject<FriendList[]>([]);
  messages: BehaviorSubject<MessageStructure[]> = new BehaviorSubject<
    MessageStructure[]
  >([]);
  selectedFriend: Friend | null = null;
  currentUser: User | null = null;

  ngOnInit(): void {
    this.userService.forceGetUser().subscribe((user: UserResponse) => {
      if (user) {
        this.userService.currntUser.next(user.user);
        this.currentUser = user.user;

        this.chatService.messages.subscribe((messages: MessageStructure[]) => {
          this.messages.next(messages);
          let friends: FriendList[] = [];
          user.user.friends.forEach((friend: Friend) => {
            const chatMessages = messages.find((group: MessageStructure) => group.chatID === friend.id)?.messages;
            friends = [...friends, {
              friend,
              lastMessage: chatMessages ? chatMessages[chatMessages.length - 1].message : 'Select to start chatting!'
            }]
          })
          this.friends.next(friends);

        });
      }
    });
  }

  chatSelected(event: Friend): void {
    this.selectedFriend = event;
    // Need to query messages here, scroll to bottom
    console.log(event);
  }

  sendMessage(message: string): void {
    const senderID = this.currentUser ? this.currentUser.id : 0;
    const receiverID = this.selectedFriend ? this.selectedFriend.id : 0;
    this.socketService.sendMessage(message, senderID, receiverID);
      // this.messages.value.forEach((msg) => {
      //   if(this.selectedFriend && this.currentUser && msg.chatID === this.selectedFriend.id) {
      //     const mess: Message = {
      //       id: 0,
      //       isGroup: false,
      //       isImage: false,
      //       imageLocation: '',
      //       userID: this.currentUser.id,
      //       receiverID: this.selectedFriend.id,
      //       dateCreated: new Date(),
      //       message: message
      //     }
      //     msg.messages = [...msg.messages, mess ]
      //   }
      // });
  }
}
