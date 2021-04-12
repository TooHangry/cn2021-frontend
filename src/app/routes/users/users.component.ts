import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Friend, FriendResponse } from 'src/app/interfaces';
import { FriendService } from 'src/app/services/friends/friend.service';
import { getInitialsFromName } from 'src/app/utils/user.utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private friendService: FriendService) {}
  users: BehaviorSubject<Friend[]> = new BehaviorSubject<Friend[]>([]);
  friends: BehaviorSubject<Friend[]> = new BehaviorSubject<Friend[]>([]);
  showFriends = false;

  ngOnInit(): void {
    this.friendService.getInitialUsers().subscribe((res: FriendResponse) => {
      this.users.next(res.users);
      this.friends.next(res.friends);
      this.showFriends = this.friends.value.length > 0;
    });
  }

  getImage(user: Friend): string {
    return getInitialsFromName(user.name);
  }

  addFriend(user: Friend): void {
    const oldUsers = this.users.value;
    const oldFriends = this.friends.value;
    this.showFriends = true;

    const id = user.friendID ? user.friendID : user.id;


    this.friendService.addFriend(id).subscribe((res: any) => {
      this.friends.next([user, ...oldFriends]);
      this.users.next(oldUsers.filter((f) => f.id !== id));
    });
  }

  getUsername(username: string): string {
    if (username) {
      return '"' + username + '"';
    }
    return '';
  }

  remove(user: Friend): void {
    const oldUsers = this.users.value;
    const oldFriends = this.friends.value;
    const id = user.friendID ? user.friendID : user.id

    if (id) {
      this.friendService.removeFriend(id).subscribe((res: any) => {
        this.users.next([user, ...oldUsers]);
        this.friends.next(oldFriends.filter((f) => f.id !== id));
        this.showFriends = this.friends.value.length > 0;
      });
    }
  }
}
