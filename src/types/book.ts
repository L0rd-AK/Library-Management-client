export interface IBook {
    _id?: string;
    title: string;
    author: string;
    genre: string;
    copies: number;
    isbn: string;
    description: string;
    available: boolean;
  }

export interface IPagination{
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}