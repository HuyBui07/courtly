import { User } from '../auth/types';

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
}

