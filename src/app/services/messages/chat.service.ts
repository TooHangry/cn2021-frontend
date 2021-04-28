import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Message, MessageStructure } from 'src/app/interfaces/chat.interfaces';
import { sortMessagesByReceiver, sortMessagesByRoom } from 'src/app/utils/message.utils';
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
  groupMessages: BehaviorSubject<MessageStructure[]> = new BehaviorSubject<MessageStructure[]>([]);

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

  loadInitialGroupMessages(): void {
    this.client
      .get(`${this.apiBase}/chats/loadinitialgroup`)
      .subscribe((res: any) => {
        const id = this.authService.getID();
        if (id) {
          this.groupMessages.next(sortMessagesByRoom(res.messages, id));
        }
      });
  }

  addChat(message: Message): void {
    let old = this.messages.value;
    let userFlag = false;

    old.forEach((group: MessageStructure) => {
      if(group.chatID === message.userID || group.chatID === message.receiverID) {
        group.messages = [...group.messages, message];
        group.hasNotification = true;
        userFlag = true;
      }
    });

    // Adds a struct for user if not already assigned
    if(!userFlag) {
      const userID = this.authService.getID();
      const chatID = message.userID === userID ? message.receiverID : message.userID;
      old = [...old, {chatID: chatID, messages: [message], hasNotification: false}]
    }
    this.messages.next(old);
  }

  addGroupChat(message: Message): void {
    let old = this.groupMessages.value;
    let userFlag = false;

    const otherGroups = old.filter(group => group.chatID !== message.roomID);
    const group = old.find(group => group.chatID === message.roomID);
    const newGroups = otherGroups ? otherGroups : [];
    old = newGroups;
    if(group) {
      group.messages = [...group?.messages, message];
      group.hasNotification = true,
      userFlag = true;

      old = [group, ...newGroups];
    }

    

    

    // old.forEach((group: MessageStructure) => {
    //   if(group.chatID === message.roomID) {
    //     group.messages = [...group.messages, message];
    //     userFlag = true;
    //     group.hasNotification = true;
    //   }
    // });

    // Adds a struct for user if not already assigned
    if(!userFlag) {
      old = [...old, {chatID: message.roomID, messages: [message], hasNotification: false}]
    }
    this.groupMessages.next(old);
  }

  setMessages(messages: MessageStructure[]): void {
    this.messages.next(messages)
  }
}
