import type { IBook } from "./book";

export interface IBorrow {
    _id?: string;
    book: IBook;
    quantity: number;
    dueDate: string;
    status: 'active' | 'returned' | 'overdue';
    returnedDate?: string | null;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface IBorrowSummary {
    bookTitle: string;
    isbn: string;
    totalQuantityBorrowed: number;
  }