export interface IBorrow {
    _id?: string;
    bookId: string;
    bookTitle: string;
    author: string;
    genre: string;
    copies: number;
    isbn: string;
    available: boolean;
    borrowDate: string;
    returnDate: string;
    returned: boolean;
    borrowedCopies: number;
  }
  
  export interface IBorrowSummary {
    bookTitle: string;
    isbn: string;
    totalQuantityBorrowed: number;
  }