export interface INotificationSender {
  send(message: string, receiver: string): Promise<void>;
}
