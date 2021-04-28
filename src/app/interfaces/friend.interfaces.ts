import { Message, Room } from "./chat.interfaces";

export interface Friend {
    id: number;
    username: string;
    name: string;
    profilePicture: string;
    room: Room;
}


export interface FriendList {
    friend: Friend;
    lastMessage: Message;
    hasNotification: boolean;
}

export interface FriendResponse {
    friends: Friend[];
    users: Friend[];
}

export interface Group {
    id: number;
    chatName: string;
}

export interface CreateGroupEvent {
    userIDs: number[];
    name: string;
}