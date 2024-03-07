export interface User {
  id?: string;
  username: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SeedUser {
  username: string;
  password: string;
}
