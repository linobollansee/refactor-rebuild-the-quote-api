import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;
}
