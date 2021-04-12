export interface Friend {
    id: number;
    friendID?: number;
    username: string;
    name: string;
    profilePicture: string;
}

export interface FriendResponse {
    friends: Friend[];
    users: Friend[];
}

export interface Group {
    id: number;
    chatName: string;
}