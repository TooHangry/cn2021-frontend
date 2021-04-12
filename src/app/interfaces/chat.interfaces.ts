export interface Message {
  id: number;
  isGroup: boolean;
  isImage: boolean;
  imageLocation: string;
  userID: number;
  receiverID: number;
  dateCreated: Date;
  message: string;
}

export interface Room {
  id: number;
  isGroup: boolean;
}


export interface MessageResponse {
    message: Message;
}

export interface MessageStructure {
    chatID: number;
    messages: Message[]
}