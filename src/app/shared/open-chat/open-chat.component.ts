import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Friend } from 'src/app/interfaces';
import { Message, MessageStructure } from 'src/app/interfaces/chat.interfaces';

@Component({
  selector: 'app-open-chat',
  templateUrl: './open-chat.component.html',
  styleUrls: ['./open-chat.component.scss']
})
export class OpenChatComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() messages: MessageStructure[] | null = [];
  @Input() selectedFriend: Friend | undefined;
  @Output() sentMessage: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log(this.messages);
  }

  send(): void {
    const message = (document.getElementById('input') as HTMLInputElement)
      .value;


    this.sentMessage.emit(message);
    (document.getElementById('input') as HTMLInputElement).value = '';
  }

  sentByUser(message: Message): boolean {
    if (this.selectedFriend) {
      return this.selectedFriend.friendID === message.receiverID;
    }
    return false;
  }

  getMessages(): Message[] {
    if (this.messages && this.selectedFriend && this.selectedFriend.friendID) {
      const indexedValue = this.messages.find(
        //@ts-ignore
        (m) => m.chatID === this.selectedFriend.friendID
      );
      return indexedValue ? indexedValue.messages : [];
    }
    return [];
  }

  keyUp(event: any): void {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.send();
    }
  }
}
