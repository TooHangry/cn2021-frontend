import { Component, OnInit } from '@angular/core';
import { User, UserResponse } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user/user.service';
import { getInitialsFromName } from 'src/app/utils/user.utils';
import { isValidEmail } from 'src/app/utils/validators.utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {}
  user: User | undefined = undefined;
  message = '';

  ngOnInit(): void {
    this.userService.forceGetUser().subscribe((user: UserResponse) => {
      if (user) {
        this.user = user.user;
        console.log(this.user);
      }
    });
  }

  getName(): string {
    return this.user ? this.user.name : '';
  }

  getInitials(): string {
    const name = this.getName();
    return getInitialsFromName(name);
  }

  getFirstName(): string {
    const name = this.getName();

    return name.substr(0, name.indexOf(' '));
  }

  getLastName(): string {
    const name = this.getName();
    return name.substr(name.indexOf(' ') + 1);
  }

  getNickname(): string {
    const name = this.user && this.user.username ? this.user.username : '';
    return name;
  }

  getEmail(): string {
    const email = this.user && this.user.email ? this.user.email : '';
    return email;
  }

  emailUp(id: string): void {
    const email = (document.getElementById(
      id
    ) as HTMLInputElement).value.trim();
    this.message = !isValidEmail(email)
      ? 'Please enter a valid email address'
      : '';
  }

  save(): void {
    const fname = (document.getElementById(
      'first'
    ) as HTMLInputElement).value.trim();
    const lname = (document.getElementById(
      'last'
    ) as HTMLInputElement).value.trim();
    const nickname = (document.getElementById(
      'nickname'
    ) as HTMLInputElement).value.trim();
    const email = (document.getElementById(
      'email'
    ) as HTMLInputElement).value.trim();

    if (fname !== '' && lname !== '' && isValidEmail(email)) {
      this.userService.updateUser(fname, lname, nickname, email).subscribe(
        (res: any) => {
          this.userService.setUser(res);
          window.location.reload();
        },
        (err: any) => {
          this.message = err.error;
        }
      );
    } else {
      this.message = isValidEmail(email)
        ? 'Please enter a valid email address'
        : '';
    }
  }
}
