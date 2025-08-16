import { Request, Response } from "express";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationEmail } from "../config/emailConfig";

export const registerUser = async (req: Request, res: Response) => {
  // Registration logic here
  try {
    const { email, password, name } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      name,
      verificationToken,
    });
await newUser.save();

    const result = await sendVerificationEmail(newUser.email, verificationToken);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
