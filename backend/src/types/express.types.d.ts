import { IUserDocument } from './user';
import { ICaptainDocument } from './captain';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
      captain?: ICaptainDocument;
    }
  }
}