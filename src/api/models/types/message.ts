export interface Message {
  sender: string;
  message: string;
  username: string;
}

export interface ParsedMessage {
  action: 'send_message'| 'delete_message';
  data: string;
}
