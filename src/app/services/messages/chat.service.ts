import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Message, MessageStructure } from 'src/app/interfaces/chat.interfaces';
import { sortMessagesByReceiver } from 'src/app/utils/message.utils';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private environmentService: EnvironmentService,
    private client: HttpClient,
    private authService: AuthService
  ) {}

  apiBase = this.environmentService.getBaseURL();
  messages: BehaviorSubject<MessageStructure[]> = new BehaviorSubject<MessageStructure[]>([]);

  loadInitialMessages(): void {
    this.client
      .get(`${this.apiBase}/chats/loadinitial`)
      .subscribe((res: any) => {
        const id = this.authService.getID();
        if (id) {
          this.messages.next(sortMessagesByReceiver(res.messages, id));
        }
      });
  }

  addChat(message: Message): void {
    const old = this.messages.value;
    old.forEach((group: MessageStructure) => {
      if(group.chatID === message.userID || group.chatID === message.receiverID) {
        group.messages = [...group.messages, message]
      }
    });

    this.messages.next(old);
  }
}
