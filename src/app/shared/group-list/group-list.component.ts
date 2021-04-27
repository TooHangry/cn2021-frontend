import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageStructure, Room } from 'src/app/interfaces/chat.interfaces';
import { ChatService } from 'src/app/services/messages/chat.service';
import { getInitialsFromName } from 'src/app/utils/user.utils';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  @Input() groups: Room[] | null = [];
  @Input() title = '';
  @Input() showCreate = false;
  @Output() chatSelected: EventEmitter<Room> = new EventEmitter();
  @Output() create: EventEmitter<null> = new EventEmitter();
  @Output() exit: EventEmitter<null> = new EventEmitter();
  constructor(private router: Router, private messageService: ChatService) {}

  ngOnInit(): void {}

  goToAdd(): void {
    this.router.navigate(['/users']);
  }

  selectChat(chat: Room): void {
    this.chatSelected.emit(chat);
  }

  getInitials(room: Room) {
    return getInitialsFromName(room.name);
  }

  getUsers(chat: Room): string {
    return chat.users ? chat.users.map((u) => u.name).join(', ') : '';
  }
}
