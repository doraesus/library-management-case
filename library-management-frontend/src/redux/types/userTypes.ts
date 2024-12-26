
export interface UserState {
  userList: User[];
  userDetails: User | null;
  eligibleUsers: User[];
  loading: boolean;
  error: string | null;
}

export interface Book {
  id: number;
  name: string;
  userScore?: number;
}

export interface User {
  id: number;
  name: string;
  books?: {
    past: Book[];
    present: Book[];
  };
}


export interface BorrowBookPayload {
  userId: number;
  bookId: number;
}

export interface ReturnBookPayload {
  userId: number;
  bookId: number;
  score: number;
}