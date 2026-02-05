-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "UserRoleEnum" NOT NULL DEFAULT 'USER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "otp" TEXT,
    "otpExpiry" TIMESTAMP(3),
    "notification" BOOLEAN NOT NULL DEFAULT true,
    "fcmToken" TEXT,
    "birthday" TEXT,
    "age" INTEGER,
    "number" TEXT,
    "forgetPasswordToken" TEXT,
    "forgetPasswordTokenExpires" TIMESTAMP(3),
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT true,
    "emailVerificationToken" TEXT,
    "emailVerificationTokenExpires" TIMESTAMP(3),
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "twoFactor" BOOLEAN DEFAULT false,
    "twoFactorOTP" TEXT,
    "twoFactorOTPExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
