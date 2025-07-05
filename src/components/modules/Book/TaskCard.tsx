import { UpdateBookModal } from "@/components/modules/Book/UpdateBookModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteBook } from "@/redux/featurs/book/bookSlice";
import { useAppDispatch } from "@/redux/hooks";
import { type IBook } from "@/types";
import { Trash2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const dispatch = useAppDispatch();
  
  return (
    <div className="border px-5 py-3 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={cn("size-3 rounded-full", {
                "bg-green-500": book.available,
                "bg-red-500": !book.available,
              })}
            ></div>
            <h1 className="text-xl font-semibold text-gray-900">
              {book.title}
            </h1>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Author:</span> {book.author}</p>
            <p><span className="font-medium">Genre:</span> {book.genre}</p>
            <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
            <p><span className="font-medium">Copies:</span> {book.copies}</p>
            <p><span className="font-medium">Status:</span> 
              <span className={cn("ml-1 px-2 py-1 rounded-full text-xs font-medium", {
                "bg-green-100 text-green-800": book.available,
                "bg-red-100 text-red-800": !book.available,
              })}>
                {book.available ? 'Available' : 'Unavailable'}
              </span>
            </p>
          </div>
          {book.description && (
            <p className="mt-3 text-gray-700 text-sm">{book.description}</p>
          )}
        </div>
        <div className="flex gap-2 items-center ml-4">
          <UpdateBookModal book={book} />
          <Link to={`/borrow/${book._id}`}>
            <Button
              variant="outline"
              size="sm"
              disabled={!book.available}
              className="text-blue-600 hover:text-blue-700"
            >
              <BookOpen className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            onClick={() => dispatch(deleteBook(book._id as string))}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
