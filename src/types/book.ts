export interface IBook {
    _id?: string;
    title: string;
    author: string;
    genre: string;
    copies: number;
    isbn: string;
    description: string;
    available: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export interface IBookResponse {
  data: IBook;
  success: boolean;
  message?: string;
}
export interface IPagination{
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}