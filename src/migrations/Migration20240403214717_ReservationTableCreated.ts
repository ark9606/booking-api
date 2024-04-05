import { Migration } from '@mikro-orm/migrations';

export class Migration20240403214717_ReservationTableCreated extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "reservations" ("ReservationId" uuid not null, "DateStart" timestamp not null, "DateEnd" timestamp not null, "StatusCode" int not null, "UserId" uuid not null, "RoomId" uuid not null, constraint "reservations_pkey" primary key ("ReservationId"));',
    );

    this.addSql(
      'alter table "reservations" add constraint "reservations_UserId_foreign" foreign key ("UserId") references "users" ("UserId") on update cascade;',
    );
    this.addSql(
      'alter table "reservations" add constraint "reservations_RoomId_foreign" foreign key ("RoomId") references "rooms" ("RoomId") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "reservations" cascade;');
  }
}
