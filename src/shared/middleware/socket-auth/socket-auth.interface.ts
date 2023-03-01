import { Socket } from 'socket.io';
import { User } from 'src/modules/user/entities/user.entity';

export interface AuthSocket extends Socket {
  user: Partial<User>;
}

export type TSocketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => void;
