export type JWTPayloadType = {
  id: string;
  email: string;
  roleId: number;
}

export enum Role {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  USER = 3,
}
