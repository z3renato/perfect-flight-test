import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  _id: number;

  @Column()
  userName: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index({ unique: true })
  email: string;

  @Column()
  avatar: string;

  @Column({ type: 'datetime', default: () => "datetime('now')" })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => "datetime('now', 'localtime')",
    onUpdate: "datetime('now', 'localtime')",
  })
  updatedAt: Date;
}
