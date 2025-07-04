import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { addBorrow } from "@/redux/featurs/borrow/borrowSlice";
import { useAppDispatch } from "@/redux/hooks";
import { type IBorrow } from "@/types";
import { Plus } from "lucide-react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { v4 as uuid } from "uuid";
import TMForm from "../../form/TMForm";
import TMInput from "../../form/TMInput";

interface IProps {
  bookId: string;
  bookTitle: string;
  author: string;
  genre: string;
  isbn: string;
  available: boolean;
}

export function AddBorrowModal({ bookId, bookTitle, author, genre, isbn, available }: IProps) {
  const dispatch = useAppDispatch();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const borrowData: IBorrow = {
      _id: uuid(),
      bookId: bookId,
      bookTitle: bookTitle,
      author: author,
      genre: genre,
      copies: 1,
      isbn: isbn,
      available: available,
      borrowDate: new Date().toISOString(),
      returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      returned: false,
      borrowedCopies: parseInt(data.borrowedCopies) || 1,
    };

    dispatch(addBorrow(borrowData));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!available} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Borrow Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <TMForm className="space-y-4" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <p className="text-sm text-gray-600"><strong>Book:</strong> {bookTitle}</p>
            <p className="text-sm text-gray-600"><strong>Author:</strong> {author}</p>
            <p className="text-sm text-gray-600"><strong>ISBN:</strong> {isbn}</p>
          </div>

          <TMInput 
            name="borrowedCopies" 
            label="Number of Copies to Borrow" 
            // type="number"
            defaultValue="1"
            // min="1"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Borrow Book</Button>
            </DialogClose>
          </DialogFooter>
        </TMForm>
      </DialogContent>
    </Dialog>
  );
}
