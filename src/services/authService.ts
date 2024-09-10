import { User } from "@prisma/client";
import { db } from "../lib/prisma";
import { HttpError } from "../http/error";
import { compare, hash } from "bcrypt";
import { JWTPayloadType, Role } from "../types/auth";
import { sign } from "jsonwebtoken";

export const createUser = async (email: string, password: string) => {
  const existingUser: User = await db.user.findUnique({
    where: {
      email
    }
  });
  if ( existingUser ) throw new HttpError(409, `User with email ${email} already exists`);
  const hashedPassword = await hash(password, 10);
  const user: User = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      roleId: Role.USER
    }
  });
  const { password: newUserPassword, ...newUser } = user;
  return newUser;
}

export const authenticateUser = async (email: string, password: string) => {
  const user: User = await db.user.findUnique({
    where: {
      email
    }
  });
  if ( !user || !await compare(password, user.password) ) {
    throw new HttpError(401, `Invalid credentials for user ${email}`);
  }
  const token = generateToken(user);
  const { password: newUserPassword, ...newUser } = user;
  return { ...newUser, token };
}

const generateToken = (user: User) => {
  const payload: JWTPayloadType = {
    id: user.id,
    email: user.email,
    roleId: user.roleId
  }
  return sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE
    }
  )
}
