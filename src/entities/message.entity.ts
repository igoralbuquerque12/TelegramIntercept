export interface IncomingMessageDTO {
  senderId?: string;
  senderName: string;
  chatId?: string;
  chatTitle: string;
  text: string;
  date: Date;
}