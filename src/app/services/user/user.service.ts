import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CreateUser, User, UserResponse } from 'src/app/interfaces';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private environmentService: EnvironmentService,
    private client: HttpClient,
    private authService: AuthService
  ) {}
  currntUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  baseURL = this.environmentService.getBaseURL();

  // Sends API request to create a new user
  signUp(createUser: CreateUser): Observable<UserResponse> {
    const data = new FormData();
    data.append('email', createUser.email);
    data.append('firstName', createUser.firstName);
    data.append('lastName', createUser.lastName);
    data.append('password', createUser.password);

    return this.client
      .post(`${this.baseURL}/users/signup`, data)
      .pipe(map((res: any) => res));
  }

  // Sends API request to log user in
  login(email: string, password: string): Observable<UserResponse> {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    return this.client
      .post(`${this.baseURL}/users/login`, data)
      .pipe(map((res: any) => res));
  }

  logout() {
    this.currntUser.next(null);
    this.authService.logout();
  }

  setUser(user: UserResponse): void {
    this.currntUser.next(user.user);
    if(user.token) {
    this.authService.setToken(user.token);
    }
  }

  getUser(): Observable<User | null> {
    if(!this.currntUser.value) {
      this.client.get(`${this.baseURL}/users/me`).subscribe((res: any) => {
        this.currntUser.next(res.user)
      })
    }
    return this.currntUser;
  }

  forceGetUser(): Observable<UserResponse> {
    return this.client.get(`${this.baseURL}/users/me`).pipe(map((res: any) => res));
  }

  updateUser(first: string, last: string, nickname: string, email: string): Observable<any> {
    const data = new FormData();
    data.append('first', first);
    data.append('last', last);
    data.append('nickname', nickname);
    data.append('email', email);

    return this.client.post(`${this.baseURL}/users/update/me`, data);
  }
}
