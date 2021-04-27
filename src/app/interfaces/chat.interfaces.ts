import { User } from "./user.interfaces";

export interface Message {
  id: number;
  isGroup: boolean;
  roomID: number;
  isImage: boolean;
  imageLocation: string;
  userID: number;
  receiverID: number;
  dateCreated: Date;
  message: string;
  username: string;
}

export interface Room {
  id: number;
  name: string;
  isGroup: boolean;
  users?: User[];
  lastMessage?: string;
}


export interface MessageResponse {
    message: Message;
}

export interface MessageStructure {
    chatID: number;
    messages: Message[]
}