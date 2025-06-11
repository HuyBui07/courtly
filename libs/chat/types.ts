import { User } from '../auth/types';

export interface IMessage {
  _id: string;
  text: string;
  email: string;
  timestamp?: number;
}

