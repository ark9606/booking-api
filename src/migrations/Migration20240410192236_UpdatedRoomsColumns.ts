import { Migration } from '@mikro-orm/migrations';

export class Migration20240410192236_UpdatedRoomsColumns extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "rooms" add column "CreatedAt" timestamptz not null;',
    );
    this.addSql(
      'alter table "rooms" alter column "Price" type numeric(10,2) using ("Price"::numeric(10,2));',
    );

    this.addSql(
      'alter table "reservations" alter column "DateStart" type timestamptz using ("DateStart"::timestamptz);',
    );
    this.addSql(
      'alter table "reservations" alter column "DateEnd" type timestamptz using ("DateEnd"::timestamptz);',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "rooms" drop column "CreatedAt";');

    this.addSql(
      'alter table "rooms" alter column "Price" type int using ("Price"::int);',
    );

    this.addSql(
      'alter table "reservations" alter column "DateStart" type date using ("DateStart"::date);',
    );
    this.addSql(
      'alter table "reservations" alter column "DateEnd" type date using ("DateEnd"::date);',
    );
  }
}
