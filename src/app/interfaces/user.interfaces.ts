import { Room } from "./chat.interfaces";
import { Friend } from "./friend.interfaces";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    profilePicture: string;
    friends: Friend[];
    rooms: Room[]
}

export interface UserResponse {
    user: User,
    token: string
}

export interface CreateUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface UserFriendListItem {
    id: number,
    username: string,
    lastMessage?: string,
}