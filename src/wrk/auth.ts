import { db } from "../lib/prisma";
import { HttpError } from "../http/HttpError";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "@prisma/client";

export const createUser = async (email: string, password: string) => {
  const existingUser: User = await db.user.findUnique({
    where: {
      email
    }
  });
  if ( existingUser ) throw new HttpError(409, "User already exists");
  const hashedPassword = await hash(password, 10);
  const user: User = await db.user.create({
    data: {
      email,
      password: hashedPassword
    },
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
    throw new HttpError(401, "Invalid credentials");
  }
  const token = generateToken(user.id, user.email);
  const { password: newUserPassword, ...newUser } = user;
  return { ...newUser, token };
}

const generateToken = (id: string, email: string) => {
  return sign({
      id,
      email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE
    }
  )
}