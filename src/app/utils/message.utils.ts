import { Message, MessageStructure } from '../interfaces/chat.interfaces';

// Sorts messages by the receiver, returns a MessageStructure object
export const sortMessagesByReceiver = (messages: Message[], currentUserID: number) => {
  // Gets unique freind IDs on the messages (Checks both sender and receiver, omits current user)
  if (messages) {
    const userIDs = [
      ...new Set(
        messages.map((message) =>
          currentUserID === message.userID ? message.receiverID : message.userID
        )
      ),
    ];
    let struct: MessageStructure[] = [];

    // Initialize the chat structure
    userIDs.forEach((id: number) => {
      struct = [
        ...struct,
        {
          chatID: id,
          messages: [],
          hasNotification: false
        },
      ];
    });

    messages.forEach((message: Message) => {
      struct.forEach((group: MessageStructure) => {
        if (
          group.chatID === message.userID ||
          group.chatID === message.receiverID
        ) {
          group.messages = [...group.messages, message];
        }
      });
    });

    return struct;
  }
  return [];
};


// Sorts messages by the rooomID, returns a MessageStructure object
export const sortMessagesByRoom = (messages: Message[], currentUserID: number) => {
  if (messages) {
    const roomIDs = [
      ...new Set(
        messages.map((message) =>message.roomID)
      ),
    ];
    let struct: MessageStructure[] = [];

    // Initialize the chat structure
    roomIDs.forEach((id: number) => {
      struct = [
        ...struct,
        {
          chatID: id,
          messages: [],
          hasNotification: false
        },
      ];
    });

    messages.forEach((message: Message) => {
      struct.forEach((group: MessageStructure) => {
        if (
          group.chatID === message.roomID
        ) {
          group.messages = [...group.messages, message];
        }
      });
    });

    return struct;
  }
  return [];
};
