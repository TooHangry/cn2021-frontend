import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private environmentService: EnvironmentService, private client: HttpClient, private authService: AuthService) { }
  public user: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  public users: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>([]);

  url = `${this.environmentService.getBaseUrl()}`;

  signup(username: string, password: string, name: string): Observable<any> {
    const newUser = new FormData();
    newUser.append('username', username);
    newUser.append('password', password);
    newUser.append('name', name);

    return this.client.post(`${this.url}/signup`, newUser);
  }

  login(username: string, password: string): Observable<any> {
    const newUser = new FormData();
    newUser.append('username', username);
    newUser.append('password', password);

    return this.client.post(`${this.url}/login`, newUser);
  }

  setUser(user: any): void {
    this.user.next(user);
  }

  getUser(): any {
    if (this.user.value) {
      return this.user
    } else {
      return this.client.get(`${this.url}/currentUser`).pipe(map((res: any) =>  {
        return res.user;
      }));
    }
  }

  setDarkMode(): void {
    this.client.put(`${this.url}/darkmode`, 0).subscribe((user: any) => this.user.next(user.user))
  }

  getUserList(): any {
    if(this.users && this.users.value && this.users.value.length > 0) {
      return this.users;
    } else {
      this.client.get(`${this.url}/userlist`).subscribe((res: any) => {
        this.users.next(res.users)});

        return this.users;
    }
  }

  changeColor(event: any): any {
    const colorData = new FormData();
    colorData.append('color', event.color);
    colorData.append('receiver', event.receiver.id);
    return this.client.post(`${this.url}/setColor`, colorData).pipe(map((res: any) => res.color));
  }

  clearNotifications(room: string): void {
    this.client.get(`${this.url}/clearNotifications/${room}`).subscribe((res: any) => this.user.next(res.user));
  }
}
