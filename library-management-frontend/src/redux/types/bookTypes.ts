
export interface BorrowerInfo {
  userId: number;
  userName: string;
}

export interface Book {
  id: number;
  name: string;
  score: number;
  isBorrowed?: boolean;
  borrowerInfo?: BorrowerInfo;
}

export interface BookState {
  bookList: Book[];
  bookDetails: Book | null;
  loading: boolean;
  error: string | null;
}
