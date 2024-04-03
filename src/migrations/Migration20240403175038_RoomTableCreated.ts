import { Migration } from '@mikro-orm/migrations';

export class Migration20240403175038_RoomTableCreated extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "rooms" ("RoomId" uuid not null, "Title" text not null, "Location" text not null, "Description" text not null, "Area" int not null, "Price" int not null, constraint "rooms_pkey" primary key ("RoomId"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "rooms" cascade;');
  }
}
