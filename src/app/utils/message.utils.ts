import { Message, MessageStructure } from '../interfaces/chat.interfaces';

// Sorts messages by the receiver, returns a MessageStructure object
export const sortMessagesByReceiver = (
  messages: Message[],
  currentUserID: number
) => {
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
