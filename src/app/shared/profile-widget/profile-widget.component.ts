import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user/user.service';
import { showMainContentMobile } from 'src/app/utils/mobile.utils';
import { getInitialsFromName } from 'src/app/utils/user.utils';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.scss'],
})
export class ProfileWidgetComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: User | null) => {
      if (user) {
        this.user.next(user);
      }
    });
  }

  login(): void {
    showMainContentMobile();
    this.router.navigate(['/login']);
  }

  profile(): void {
    showMainContentMobile();
    this.router.navigate(['/me']);
  }

  getName(): string {
    return this.user.value ? this.user.value.name : '';
  }

  getEmail(): string {
    return this.user.value ? this.user.value.email : '';
  }

  getInitials(): string {
    const name = this.user.value ? this.user.value.name : '';
    return getInitialsFromName(name);
  }
}
