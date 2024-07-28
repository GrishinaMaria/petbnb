export type User = {
  id: number;
  username: string;
  email: string;
};

export type Entry = {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Entries = Entry[]
