import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Friend, User } from 'src/app/interfaces';
import { Message, MessageStructure, Room } from 'src/app/interfaces/chat.interfaces';

@Component({
  selector: 'app-open-chat',
  templateUrl: './open-chat.component.html',
  styleUrls: ['./open-chat.component.scss'],
})
export class OpenChatComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() group = false;
  @Input() messages: MessageStructure[] | null = [];
  @Input() selectedFriend: Friend | undefined;
  @Input() selectedRoom: Room | null = null;
  @Input() user: User | null = null;
  @Output() sentMessage: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  send(): void {
    const message = (document.getElementById('input') as HTMLInputElement)
      .value;

    if (message) {
      this.sentMessage.emit(message);
      (document.getElementById('input') as HTMLInputElement).value = '';
    }
  }

  sentByUser(message: Message): boolean {
    if (this.selectedFriend) {
      return this.selectedFriend.id === message.receiverID;
    }
    return false;
  }

  getMessages(): Message[] {
    if (this.messages && this.selectedFriend) {
      const indexedValue = this.messages.find(
        //@ts-ignore
        (m) => m.chatID === this.selectedFriend.id
      );
      return indexedValue ? indexedValue.messages : [];
    }
    return [];
  }

  getGroupMessages(): Message[] {
    if(this.messages && this.selectedRoom !== null) {
      //@ts-ignore
      const room = this.messages.find(grouping => grouping.chatID === this.selectedRoom.id);
      return room ? room.messages : []
    }
    return [];
  }

  sentFromUser(m: Message): boolean {
    if(this.user) {
      return this.user.id === m.userID
    }
    return false;
  }

  keyUp(event: any): void {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.send();
    }
  }
}
