import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  homePage?: string;

  @Column()
  text: string;
}
