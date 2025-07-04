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

import { useAddBookMutation } from "@/redux/featurs/api/booksApi";
import { Plus } from "lucide-react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import TMForm from "../../form/TMForm";
import TMInput from "../../form/TMInput";
import TMSelect from "../../form/TMSelect";
import TMTextarea from "../../form/TMTextArea";
import type { IBook } from "@/types";

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

export function AddBookModal() {
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const bookData: Omit<IBook, '_id'> = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      isbn: data.isbn,
      copies: parseInt(data.copies),
      description: data.description,
      available: true,
    };

    try {
      await addBook(bookData).unwrap();
      // The dialog will close automatically due to DialogClose
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <TMForm className="space-y-4" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
          </DialogHeader>

          <TMInput name="title" label="Title" />
          <TMInput name="author" label="Author" />
          <TMSelect
            name="genre"
            label="Genre"
            options={genreOptions}
          />
          <TMInput name="isbn" label="ISBN" />
          <TMInput 
            name="copies" 
            label="Number of Copies" 
            // type="number"
            defaultValue="1"
          />
          <TMTextarea name="description" label="Description" />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Book'}
              </Button>
            </DialogClose>
          </DialogFooter>
        </TMForm>
      </DialogContent>
    </Dialog>
  );
}
