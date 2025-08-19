import { Request, Response } from "express";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendPasswordResetEmail, sendVerificationEmail } from "../config/emailConfig";
import generateToken from "../utils/generateToken";
import UserModel, { UserDocument } from "../models/user";



declare global {
  namespace Express {
    interface Request {
      id?: string; 
    }
  }
}


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
      password,
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

export const verifyUser = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    const user = await UserModel.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    user.isVerified = true;
    user.verificationToken = ""; // Clear the token after verification

    const accessToken = generateToken(user);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    await user.save();
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//login verification

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }) as UserDocument;
    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "User not verified, please check your email for verification link." });
    }
   
    const accessToken = generateToken(user);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//forgot password

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email }) as UserDocument;
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    await user.save();
    await sendPasswordResetEmail(user.email, resetToken);
    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Reset password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    }) as UserDocument;
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.password = newPassword;
    user.resetPasswordToken = " ";
    user.resetPasswordExpires = new Date();
    console.log(user.resetPasswordToken);

    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//logout
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};  

export const checkAuth = async (req: Request, res: Response) => {
try {
  if (!req.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await UserModel.findById(req.id) as UserDocument;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(200).json({ message: "User authenticated successfully", user });
  } catch (error) {
    console.error("Error checking user authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
