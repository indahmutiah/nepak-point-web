export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type RegisterUser = Pick<User, "email" | "password" | "name">;
export type LoginUser = Pick<User, "email" | "password">;
