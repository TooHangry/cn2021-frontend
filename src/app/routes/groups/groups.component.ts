import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Friend, FriendResponse, User, UserResponse } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  selectedChatName = '';
  groups: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.forceGetUser().subscribe((user: UserResponse) => {
      if (user) {
        this.user.next(user.user);
        this.userService.setUser(user);
      }
    });
  }

  showCreation(): boolean {
    return this.groups.value && this.groups.value.length < 1;
  }
}
