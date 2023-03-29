import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ nullable: false, default: 'none' })
  userAvatar: 'none' | 'man' | 'woman';

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  homePage?: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: true })
  attachmentUrl?: string;

  @Column({ nullable: false, default: false })
  isAnswer: boolean;

  @Column({ nullable: true })
  answeredToCommentId?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
