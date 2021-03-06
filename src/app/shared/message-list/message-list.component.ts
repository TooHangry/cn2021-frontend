import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Friend, FriendList, User } from 'src/app/interfaces';
import { Message } from 'src/app/interfaces/chat.interfaces';
import { getInitialsFromName } from 'src/app/utils/user.utils';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input() currentUser: User | null = null;
  @Input() friends: FriendList[] | null = [];
  @Input() title = '';
  @Output() chatSelected: EventEmitter<Friend> = new EventEmitter();
  @Output() exit: EventEmitter<null> = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAdd(): void {
    this.router.navigate(['/users'])
  }

  selectChat(chat: Friend): void {
    this.chatSelected.emit(chat);
  }

  getInitials(user: Friend) {
    return getInitialsFromName(user.name)
  }

  showNotification(chat: FriendList): boolean {
    if(this.currentUser) {
      return chat.hasNotification && (chat.lastMessage.userID !== this.currentUser.id);
    }
    return false;
  }
}
