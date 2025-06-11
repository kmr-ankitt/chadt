import { verifyToken } from "@clerk/backend";
import type { Server, Socket } from "socket.io";

interface VerifiedToken {
  sub: string;
  sid: string;
  [key: string]: any;
}

export const authMiddleware = (io: Server) => {
  io.use(async (socket: Socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('No token provided'));

    try {
      const verifiedToken = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      }) as VerifiedToken;

      console.log(verifiedToken)

      const userId = verifiedToken.sub;
      const sessionID = verifiedToken.sid;
      (socket as any).user = {
        userId,
        sessionID
      };
      next();
    } catch (err) {
      next(new Error('Unauthorized'));
    }
  });
};
