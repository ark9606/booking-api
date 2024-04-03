import { Migration } from '@mikro-orm/migrations';

export class Migration20240403181043_UserTableCreated extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("UserId" uuid not null, "FirstName" text not null, "LastName" text not null, "Email" text not null, constraint "users_pkey" primary key ("UserId"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }
}
