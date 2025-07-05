import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBorrow, IBorrowSummary } from '@/types';
import { booksApi } from './booksApi';

// Define a service using a base URL and expected endpoints
export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Borrows', 'Books'],
  endpoints: (builder) => ({
    getBorrows: builder.query<{ success: boolean; data: IBorrow[]; pagination: { page: number; limit: number; total: number; totalPages: number; hasNext: boolean } }, void>({
      query: () => '/borrows',
      providesTags: ['Borrows'],
    }),
    borrowBook: builder.mutation<IBorrow, { bookId: string; quantity: number; dueDate: string }>({
      query: (borrowData) => ({
        url: '/borrows',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrows', 'Books'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Force refetch books after successful borrow
          dispatch(booksApi.util.invalidateTags(['Books']));
        } catch {
          // Handle error if needed
        }
      },
    }),
    returnBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/borrows/${id}/return`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Borrows', 'Books'],
    }),
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => '/borrows/summary',
      providesTags: ['Borrows'],
    }),
  }),
});

export const {
  useGetBorrowsQuery,
  useBorrowBookMutation,
  useReturnBookMutation,
  useGetBorrowSummaryQuery,
} = borrowApi;
