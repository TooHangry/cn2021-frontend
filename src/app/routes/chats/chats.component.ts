import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Friend, FriendList, User, UserResponse } from 'src/app/interfaces';
import { Message, MessageStructure } from 'src/app/interfaces/chat.interfaces';
import { ChatService } from 'src/app/services/messages/chat.service';
import { SocketService } from 'src/app/services/sockets/socket.service';
import { UserService } from 'src/app/services/user/user.service';
import { showMainMenuMobile } from 'src/app/utils/mobile.utils';

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
        this.userService.setUser(user);
        this.currentUser = user.user;

        this.chatService.messages.subscribe((messages: MessageStructure[]) => {
          this.messages.next(messages);
          let friends: FriendList[] = [];
          user.user.friends.forEach((friend: Friend) => {
            const chatMessages = messages.find((group: MessageStructure) => group.chatID === friend.id)?.messages;
            const notify = messages.find((group: MessageStructure) => group.chatID === friend.id)?.hasNotification;
            friends = [...friends, {
              friend,
              lastMessage: chatMessages ? chatMessages[chatMessages.length - 1]: {
                id: 0,
                isGroup: false,
                roomID: 0,
                isImage: false,
                imageLocation: '',
                userID: user.user.id,
                receiverID: friend.id,
                dateCreated: new Date(),
                message: 'Select to start chatting!',
                username: ''
              },
              hasNotification: notify ? notify : false
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

    const currentFriends = this.friends.value; 
    // clear notification on select.
    currentFriends.forEach((friend:FriendList)=>{
      if(friend.friend.id === event.id){
        friend.hasNotification = false;
      }
    })
    this.friends.next(currentFriends);
  }

  sendMessage(message: string): void {
    const senderID = this.currentUser ? this.currentUser.id : 0;
    const receiverID = this.selectedFriend ? this.selectedFriend.id : 0;
    this.socketService.sendMessage(message, senderID, receiverID);
  }

  close(): void {
    const list = (document.getElementById('list') as HTMLDivElement);
    list.style.transform = 'scale(0)';
  }

  showMainMenu(): void {
    showMainMenuMobile();
  }
}
