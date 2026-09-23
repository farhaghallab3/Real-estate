import type { User } from "./user";

export type LoginCredentials = {
  username: string;
  password: string;
  remember: boolean;
};

export type LoginResponse = {
  access: string;
  refresh: string;
  user: User;
};

export type RefreshResponse = {
  access: string;
  refresh: string;
};

export type Session = {
  accessToken: string;
  user: User;
};
