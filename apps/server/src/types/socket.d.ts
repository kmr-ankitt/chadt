// src/types/socket.d.ts
import "socket.io";

declare module "socket.io" {
  interface Socket {
    user?: {
      userId: string;
      userName: string;
      userProfilePicture: string;
      sessionId: string;
    };
  }
}
