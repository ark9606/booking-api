import { Injectable, Logger } from '@nestjs/common';
import { INotificationSender } from './sender.interface';
import { Cron } from '@nestjs/schedule';

const INBOX: { receiver: string; message: string; sentAt: Date }[] = [];

@Injectable()
export class FakeSender implements INotificationSender {
  private readonly logger = new Logger(FakeSender.name);

  public async send(message: string, receiver: string): Promise<void> {
    const newMsg = { receiver, message, sentAt: new Date() };
    this.logger.log('Fake message sent:', this.formatLog(newMsg));
    INBOX.push(newMsg);
  }

  @Cron('*/30 * * * * *')
  printInbox() {
    let log = `Count of sent messages ${INBOX.length}.`;
    if (INBOX.length) {
      log +=
        ' ' +
        INBOX.map(
          (msg, ind) => `\r\n${ind + 1}. Message:${this.formatLog(msg)}\r\n`,
        ).join('');
    }
    this.logger.log(log);
  }

  private formatLog(msg: {
    receiver: string;
    message: string;
    sentAt: Date;
  }): string {
    return `\r\nReceiver: ${msg.receiver}\r\nSentAt: ${msg.sentAt.toISOString()}\r\nText: ${msg.message}`;
  }
}
