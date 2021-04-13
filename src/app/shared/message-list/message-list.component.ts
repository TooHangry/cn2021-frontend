import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Friend, FriendList } from 'src/app/interfaces';
import { getInitialsFromName } from 'src/app/utils/user.utils';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input() friends: FriendList[] | null = [];
  @Input() title = '';
  @Output() chatSelected: EventEmitter<Friend> = new EventEmitter();
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
}
