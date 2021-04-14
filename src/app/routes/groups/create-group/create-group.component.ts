import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { CreateGroupEvent, Friend, User } from 'src/app/interfaces';
import { FriendService } from 'src/app/services/friends/friend.service';
import { getInitialsFromName } from 'src/app/utils/user.utils';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Input() showExit = false;
  @Output() exit: EventEmitter<null> = new EventEmitter();
  @Output() createGroup: EventEmitter<CreateGroupEvent> = new EventEmitter();
  constructor(private friendService: FriendService) {}
  selectedUsers: Friend[] = [];
  users: Friend[] = [];

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.user) {
      this.users = this.user.friends;
    }
  }

  getImage(user: Friend): string {
    return getInitialsFromName(user.name);
  }

  getUsername(username: string): string {
    if (username) {
      return '"' + username + '"';
    }
    return '';
  }

  canCreate(): boolean {
    return (
      this.selectedUsers.length > 0 &&
      (document.getElementById('group-name') as HTMLInputElement).value.length >
        0
    );
  }

  remove(friend: Friend): void {
    this.selectedUsers = this.selectedUsers.filter((u) => u.id !== friend.id);
    this.users = [...this.users, friend];
  }

  add(friend: Friend): void {
    this.selectedUsers = [...this.selectedUsers, friend];
    this.users = this.users.filter((u) => u.id !== friend.id);
  }

  create(): void {
    const name = (document.getElementById(
      'group-name'
    ) as HTMLInputElement).value.trim();
    const userIDs = [
      ...this.selectedUsers.map((user) => user.id),
      this.user ? this.user.id : 0,
    ];
    this.createGroup.emit({ userIDs, name });
  }
}
