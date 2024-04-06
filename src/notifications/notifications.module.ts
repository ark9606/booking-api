import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SendNotificationListener } from './listeners/SendNotificationListener';
import { FakeSender } from './senders/fake.sender';
import { DI_TOKENS } from 'src/common/di-tokens';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    SendNotificationListener,
    { provide: DI_TOKENS.FAKE_SENDER, useClass: FakeSender },
  ],
})
export class NotificationsModule {}
