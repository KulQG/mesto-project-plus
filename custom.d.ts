import { JwtPayload } from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars
declare global {
    // eslint-disable-next-line no-unused-vars
    namespace Express {
      // eslint-disable-next-line no-shadow, no-unused-vars
      interface Request {
        user: { _id: string | JwtPayload}
      }
  }
}
