import { db } from "../lib/prisma";

export const getAllRoles = async () => {
  return db.role.findMany({
    select: {
      id: true,
      label: true
    }
  });
}
