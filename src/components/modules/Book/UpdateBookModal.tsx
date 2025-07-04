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

import { Pencil } from "lucide-react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import TMInput from "../../form/TMInput";
import TMForm from "../../form/TMForm";
import TMTextarea from "../../form/TMTextArea";
import TMSelect from "../../form/TMSelect";
import { useAppDispatch } from "@/redux/hooks";
import { updateBook } from "@/redux/featurs/book/bookSlice";
import { type IBook } from "@/types";

const genreOptions = [
  { value: "fiction", label: "Fiction" },
  { value: "non-fiction", label: "Non-Fiction" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "science-fiction", label: "Science Fiction" },
  { value: "fantasy", label: "Fantasy" },
  { value: "biography", label: "Biography" },
  { value: "history", label: "History" },
  { value: "self-help", label: "Self-Help" },
  { value: "other", label: "Other" },
];

export function UpdateBookModal({ book }: { book: IBook }) {
  const dispatch = useAppDispatch();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const bookData: IBook = {
      _id: book._id,
      title: data.title,
      author: data.author,
      genre: data.genre,
      isbn: data.isbn,
      copies: parseInt(data.copies),
      description: data.description,
      available: book.available
    };

    dispatch(updateBook(bookData));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <TMForm className="space-y-4" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Book</DialogTitle>
          </DialogHeader>

          <TMInput name="title" label="Title" defaultValue={book.title} />
          <TMInput name="author" label="Author" defaultValue={book.author} />
          <TMSelect
            name="genre"
            label="Genre"
            options={genreOptions}
            defaultValue={book.genre}
          />
          <TMInput name="isbn" label="ISBN" defaultValue={book.isbn} />
          <TMInput 
            name="copies" 
            label="Number of Copies" 
            // type="number"
            defaultValue={book.copies.toString()} 
          />
          <TMTextarea
            name="description"
            label="Description"
            defaultValue={book.description}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Update Book</Button>
            </DialogClose>
          </DialogFooter>
        </TMForm>
      </DialogContent>
    </Dialog>
  );
}
