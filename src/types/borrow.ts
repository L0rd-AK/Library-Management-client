import type { IBook } from "./book";

export interface IBorrow {
    _id?: string;
    book: IBook;
    bookId?: string;
    quantity: number;
    dueDate: string;
    status: 'active' | 'returned' | 'overdue';
    returnedDate?: string | null;
    returned?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface IBorrowSummary {
    bookTitle: string;
    isbn: string;
    totalQuantityBorrowed: number;
  }