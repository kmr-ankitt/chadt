import { Router } from "express";
import { createUser } from "../store/storeUser";

const userRouter = Router();

userRouter.post("/", async (req: any, res: any) => {
  const body = req.body || {};
  const { userId, name, pfp } = body;

  if (!userId || !name || !pfp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await createUser({
      sender: userId,
      senderName: name,
      senderProfilePicture: pfp,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default userRouter;