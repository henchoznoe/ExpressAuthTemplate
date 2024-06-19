import { db } from "../lib/prisma";
import { User, Role } from "@prisma/client";
import { HttpError } from "../http/HttpError";
import { hash } from "bcrypt";

export const getAllUsers = async () => {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      role: true
    }
  });
}

export const addNewUser = async (email: string, password: string, roleId: number) => {
  const existingUser: User = await db.user.findUnique({
    where: {
      email
    }
  });
  if ( existingUser ) throw new HttpError(409, `User with email ${email} already exists`);
  const existingRole: Role = await db.role.findUnique({
    where: {
      id: roleId
    }
  })
  if ( !existingRole ) throw new HttpError(404, `Role with id ${roleId} does not exist`);
  const hashedPassword = await hash(password, 10);
  const user: User = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      roleId
    }
  });
  const { password: newUserPassword, ...newUser } = user;
  return newUser;
}

export const updateUserById = async (id: string, email: string, password: string, roleId: number) => {
  const existingUser: User = await db.user.findUnique({
    where: {
      id
    }
  });
  if ( !existingUser ) throw new HttpError(404, `User with id ${id} does not exist`);
  const existingRole: Role = await db.role.findUnique({
    where: {
      id: roleId
    }
  })
  if ( !existingRole ) throw new HttpError(404, `Role with id ${roleId} does not exist`);
  const hashedPassword = await hash(password, 10);
  const user: User = await db.user.update({
    where: {
      id
    },
    data: {
      email,
      password: hashedPassword,
      roleId
    }
  });
  const { password: updatedUserPassword, ...updatedUser } = user;
  return updatedUser;
}

export const deleteUserById = async (id: string) => {
  const user: User = await db.user.findUnique({
    where: {
      id
    }
  });
  if ( !user ) throw new HttpError(404, `User with id ${id} does not exist`);
  await db.user.delete({
    where: {
      id
    }
  });
  const { password: deletedUserPassword, ...deletedUser } = user;
  return deletedUser;
}