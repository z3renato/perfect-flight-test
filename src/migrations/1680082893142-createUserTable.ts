import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1680082893142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS User (
                        _id INTEGER PRIMARY KEY AUTOINCREMENT,
                        userName TEXT NOT NULL,
                        name TEXT NOT NULL,
                        email TEXT NOT NULL UNIQUE,
                        avatar TEXT NOT NULL,
                        createdAt DATETIME DEFAULT (datetime('now')),
                        updatedAt DATETIME DEFAULT (datetime('now', 'localtime'))
                    );`;

    const triggerUpdateQuery = `CREATE TRIGGER update_Timestamp_Trigger
                                AFTER UPDATE On User
                                BEGIN
                                  UPDATE User SET updatedAt = STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW') WHERE _id = NEW._id;
                                END;`;
    await queryRunner.query(createTableQuery);
    await queryRunner.query(triggerUpdateQuery);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const dropTableQuery = `DROP TABLE IF EXISTS User;`;
    await queryRunner.query(dropTableQuery);
  }
}
