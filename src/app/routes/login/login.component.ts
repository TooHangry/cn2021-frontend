import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUser } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user/user.service';
import { isValidEmail, isValidPassword } from 'src/app/utils/validators.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  isLogin = true;
  canLogOut = false;
  message = '';
  // Determines if the user is logged in, shows logout page if they are
  ngOnInit(): void {
    this.userService.getUser().subscribe((user: any) => {
      if(user) {
        this.canLogOut = true;
      }
    })
  }

  // Issues header for login or signup
  getHeader(): string {
    return this.isLogin ? 'Login' : 'Sign Up!';
  }

  // Toggles between signup and login
  toggleSignUp(): void {
    this.isLogin = !this.isLogin;
  }

  // Checks passwords and issues an error if they do not match
  passwordUp(): void {
    const password1 = (document.getElementById('signup-password') as HTMLInputElement).value;
    const password2 = (document.getElementById('signup-password-again') as HTMLInputElement).value;
    this.message = password1 !== password2 ? "Oops! The password you have entered doesn't match!" : '';
  }

  passwordOneUp(): void {
    const password1 = (document.getElementById('signup-password') as HTMLInputElement).value;
    this.message = !isValidPassword(password1) ? 'Your password must be longer than 7 characters and contain one number, one uppercase letter, and one special character' : '';
  }

  loginPasswordUp(): void {
    const password1 = (document.getElementById('login-password') as HTMLInputElement).value;
    this.message = !isValidPassword(password1) ? 'Your password must be longer than 7 characters and contain one number, one uppercase letter, and one special character' : '';
  }

  emailUp(id: string): void {
    const email = (document.getElementById(id) as HTMLInputElement).value.trim();
    this.message = !isValidEmail(email) ? 'Please enter a valid email address' : '';
  }

  signUp(): void {
    const firstName = (document.getElementById('signup-first') as HTMLInputElement).value.trim();
    const lastName = (document.getElementById('signup-last') as HTMLInputElement).value.trim();
    const email = (document.getElementById('signup-email') as HTMLInputElement).value.trim();
    const password1 = (document.getElementById('signup-password') as HTMLInputElement).value.trim();
    const password2 = (document.getElementById('signup-password-again') as HTMLInputElement).value.trim();
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password1);
    if(firstName && lastName && validEmail && password1 && password2 && validPassword) {
      if (password1 === password2) {
        const newUser: CreateUser = {
          firstName,
          lastName,
          email,
          password: password2
        };
  
        this.userService.signUp(newUser).subscribe(
          (res: any) => { 
            this.userService.setUser(res);
            this.router.navigate(['/me']);
           },
          (err: any) => { this.message = 'That email is already being used!' }
          )}
      this.message = '';
    } else {
      if(validEmail && !validPassword) {
        this.message = 'Your password must be longer than 7 characters and contain one number, one uppercase letter, and one special character';
      } else if (!validEmail) {
        this.message = 'Please enter a valid email address';
      } else {
        this.message = 'Please fill out all of the boxes!';
      }
    }

  }

  login(): void {
    const email = (document.getElementById('login-email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('login-password') as HTMLInputElement).value.trim();
    if(email && password) {
      this.userService.login(email, password).subscribe(
        (res: any) => { 
          this.userService.setUser(res);
          this.router.navigate(['/chats']);
          // window.location.reload();
        },
        (err: any) => { this.message = "That user doesn't exist!" })
    } else {
      this.message = 'Please fill out all of the boxes!';
    }
  }

  logout(): void {
    this.userService.logout();
    window.location.reload();
  }

  home(): void {
    this.router.navigate(['/chat'])
  }
}
