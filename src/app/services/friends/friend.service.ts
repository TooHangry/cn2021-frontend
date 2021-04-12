import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Friend, FriendResponse } from 'src/app/interfaces';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private environmentService: EnvironmentService, private client: HttpClient) { }
  apiBase = this.environmentService.getBaseURL();

  getInitialUsers(): Observable<FriendResponse> {
    return this.client.get(`${this.apiBase}/friends/userlist`).pipe(map((res: any) => res));
  }

  addFriend(id: number): Observable<Friend> {
    const data = new FormData();
    data.append('id', id.toString());
    return this.client.post(`${this.apiBase}/friends/add`, data).pipe(map((res: any) => res.friend));
  }

  removeFriend(id: number): Observable<Friend> {
    return this.client.delete(`${this.apiBase}/friends/remove/${id}`).pipe(map((res: any) => res.friend));
  }
}
