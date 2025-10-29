
import { Server as SocketIOServer } from "socket.io";
import notification from "../database/models/notification";
import { IRepositoryOptions } from "../database/repositories/IRepositoryOptions";
import NotificationRepository from "../database/repositories/NotificationRepository";

// Extend SocketIO Server type with custom properties
interface ExtendedSocketIOServer extends SocketIOServer {
  users?: Record<string, string>; // user -> socket.id
  admins?: Record<string, string>; // adminId -> socket.id
}

let io: ExtendedSocketIOServer;

// Initialize io instance
export const setSocketIO = (socketIOInstance: SocketIOServer) => {
  io = socketIOInstance as ExtendedSocketIOServer;

  // initialize maps
  io.users = io.users || {};
  io.admins = io.admins || {};

  io.on("connection", (socket) => {

    // Send immediate success message (optional)
    socket.emit("success", "Connected successfully!");


    // Register user/admin
    socket.on(
      "register",
      ({ userId, isAdmin }: { userId: string; isAdmin?: boolean }) => {
      console.log("🚀 ~ setSocketIO ~ user:", userId)

        if (!userId) return;
        if (isAdmin) {
          io.admins![userId] = socket.id;
        } else {
          io.users![userId] = socket.id;
          console.log(
            "Simple user", socket.id
          );
          
        }
      }
    );

    // Handle disconnect
    socket.on("disconnect", () => {
      for (const [id, sid] of Object.entries(io.users!)) {
        if (sid === socket.id) delete io.users![id];
      }
      for (const [id, sid] of Object.entries(io.admins!)) {
        if (sid === socket.id) delete io.admins![id];
      }
    });
  });
};

interface NotificationData {
  user?: string;
  transaction: string;
  type: string; // deposit, withdraw, kyc, etc.
  forAdmin?: boolean;
  amount: String;
  options: IRepositoryOptions;
}

export async function sendNotification({
  user,
  transaction,
  type,
  forAdmin = false,
  amount,
  options,
}: NotificationData) {
  // Save notification to DB

  const data = {
    user,
    transaction,
    type,
    amount,
    forAdmin,
  };
  let notif;

  // Emit real-time
  if (forAdmin) {
    io.emit("admin", type);
  } else if (user) {
    const notif = await NotificationRepository.create(data, options);
    const unread = await NotificationRepository.countUnread(options);
    const socketId = io.users![user];
    if (socketId) {
      io.to(socketId).emit("newNotification", unread);
    }
  }

  return notif;
}
