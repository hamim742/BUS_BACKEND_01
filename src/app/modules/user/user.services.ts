import AppError from "../../error/appError";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { generateOtp } from "../../utils/generateOtp";
import crypto from "crypto";
import { otpQueueEmail } from "../../bullMQ/init";
interface UserPayload {
  name: string;
  email: string;
  password: string;
  fcmToken?: string;
}

const registerUserIntoDB = async (payload: UserPayload) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: payload?.email },
  });
  if (existingUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User already exists!');
  }
  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const otp = generateOtp(4);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  const result = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        fcmToken: payload.fcmToken || null,
        twoFactor: true,
        twoFactorOTP: otp,
        twoFactorOTPExpires: expiry,
      },
    });

    return newUser;
  });

  // Queue OTP *after* successful commit
  await otpQueueEmail.add(
    "registrationOtp",
    {
      // name: "loginOtp",
      userName: result.name,
      email: payload.email,
      otpCode: otp,
      subject: "Your Verification OTP",
    }
  );

  return {
    message: "Verification OTP sent to your email. Please verify to activate account.",
    user: result
  };
};

export const userRegisterService = {
    registerUserIntoDB,
}
