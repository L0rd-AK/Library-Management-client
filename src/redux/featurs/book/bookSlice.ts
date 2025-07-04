import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "@/types";
import type { RootState } from "@/redux/store";

interface BookState {
  books: IBook[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<IBook>) => {
      const index = state.books.findIndex(book => book._id === action.payload._id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book._id !== action.payload);
    },
    updateBookAvailability: (state, action: PayloadAction<{_id: string, quantity: number}>) => {
      const book = state.books.find(book => book._id === action.payload._id);
      if (book) {
        book.copies -= action.payload.quantity;
        book.available = book.copies > 0;
      }
    }
  }
});

export const selectBooks = (state: RootState) => state.book.books;

export const { addBook, updateBook, deleteBook, updateBookAvailability } = bookSlice.actions;

export default bookSlice.reducer;
