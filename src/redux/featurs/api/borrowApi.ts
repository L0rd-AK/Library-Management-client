import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBorrow, IBorrowSummary } from '@/types';

// Define a service using a base URL and expected endpoints
export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }), // Update with your API base URL
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
