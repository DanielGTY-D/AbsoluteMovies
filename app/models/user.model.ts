export type User = {
  email: string;
  username: string;
  password: string;
  animesFav: string;
};

export type UserRegister = Pick<User, "email" | "username" | "password">;
export type UserLogin = Pick<User, "email" | "password">;
