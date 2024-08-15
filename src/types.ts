export type SortTypes = 'asc' | 'desc' | undefined;

export type UserData = {
  login: string;
  password: string;
};

export type TNote = {
  id: number;
  description: string;
  createdAt: Date;
};
