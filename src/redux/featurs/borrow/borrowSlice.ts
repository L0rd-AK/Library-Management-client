import type { PayloadAction } from "@reduxjs/toolkit";
import  { createSlice } from "@reduxjs/toolkit";
import type { IBorrow } from "@/types";

interface BorrowState {
  borrows: IBorrow[];
}

const initialState: BorrowState = {
  borrows: [],
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    addBorrow: (state, action: PayloadAction<IBorrow>) => {
      state.borrows.push(action.payload);
    },
    returnBook: (state, action: PayloadAction<string>) => {
        const index = state.borrows.findIndex(borrow => borrow._id === action.payload);
        if (index !== -1) {
          (state.borrows[index] as IBorrow).returned = true;
        }
    },
  },
});

export const { addBorrow, returnBook } = borrowSlice.actions;

export default borrowSlice.reducer;