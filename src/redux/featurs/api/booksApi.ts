import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBook } from '@/types';

// Define a service using a base URL and expected endpoints
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Update with your API base URL
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query<{ success: boolean; data: IBook[]; pagination: any }, void>({
      query: () => '/books',
      providesTags: ['Books'],
    }),
    getBookById: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation<IBook, Omit<IBook, '_id'>>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation<IBook, IBook>({
      query: ({ _id, ...updates }) => ({
        url: `/books/${_id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
