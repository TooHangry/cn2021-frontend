import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreateGroupEvent, User, UserResponse } from 'src/app/interfaces';
import { MessageStructure, Room } from 'src/app/interfaces/chat.interfaces';
import { FriendService } from 'src/app/services/friends/friend.service';
import { ChatService } from 'src/app/services/messages/chat.service';
import { SocketService } from 'src/app/services/sockets/socket.service';
import { UserService } from 'src/app/services/user/user.service';
import { showMainMenuMobile } from 'src/app/utils/mobile.utils';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  selectedChatName = '';
  groups: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  messages: BehaviorSubject<MessageStructure[]> = new BehaviorSubject<
    MessageStructure[]
  >([]);
  selectedGroup: Room | null = null;
  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private messageService: ChatService,
    private friendService: FriendService
  ) {}

  ngOnInit(): void {
    this.userService.forceGetUser().subscribe((user: UserResponse) => {
      if (user) {
        this.user.next(user.user);
        this.userService.setUser(user);
        this.groups.next(user.user.rooms.filter((room) => room.isGroup));

        this.messageService.loadInitialGroupMessages();

        this.messageService.groupMessages.subscribe((messages: MessageStructure[]) => {
            this.messages.next(messages);
            const old = this.groups.value;
            old.forEach((group) => {
              const struct = messages.find((m) => m.chatID === group.id);
              const mess = struct?.messages ? struct.messages : [];
              group.lastMessage = mess[mess.length - 1]
                ? mess[mess.length - 1].message
                : 'Select chat to send message!';
            });
          }
        );
      }
    });
  }

  showCreation(): boolean {
    return this.groups.value && this.groups.value.length < 1;
  }

  chatSelected(event: Room): void {
    this.selectedGroup = event;
    this.selectedChatName = event.name;
    (document.getElementById('group-list') as HTMLDivElement).style.transform = 'scale(1)'

  }

  sendMessage(event: any): void {
    if (this.selectedGroup) {
      this.socketService.sendGroupMessage(event, this.selectedGroup.id);
    }
  }

  openCreateModal(): void {
    const modal = document.getElementById('create') as HTMLDivElement;
    modal.style.transform = 'scale(1)';
    setTimeout(() => {
      modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    }, 175);

  }

  closeCreateModal(): void {
    const modal = document.getElementById('create') as HTMLDivElement;
    modal.style.backgroundColor = 'rgba(0,0,0,0)';
    modal.style.transform = 'scale(0)';
  }

  createGroup(event: CreateGroupEvent): void {
    this.friendService.addGroup(event.name, event.userIDs).subscribe((data: any) => {
      this.groups.next([data.room, ...this.groups.value])
    });
    this.closeCreateModal();
  }

  exit(): void {
    (document.getElementById('group-list') as HTMLDivElement).style.transform = 'translateX(100%)'
  }

  showMobileMenu(): void {
    showMainMenuMobile();
  }
}
