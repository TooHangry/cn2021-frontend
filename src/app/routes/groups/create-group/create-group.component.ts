import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Friend, User } from 'src/app/interfaces';
import { getInitialsFromName } from 'src/app/utils/user.utils';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  constructor() {}
  selectedUsers: Friend[] = [];
  users: Friend[] = [];

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.user) {
      this.users = this.user.friends
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
    return this.selectedUsers.length > 0 && (document.getElementById('group-name') as HTMLInputElement).value.length > 0;
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
    console.log(name, this.selectedUsers);
  }
}
