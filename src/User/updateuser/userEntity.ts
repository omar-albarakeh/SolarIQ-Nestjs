import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserType } from '../Auth/user_type.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  type: UserType;

  @Column()
  phone: string;

  @Column()
  address: string;
}