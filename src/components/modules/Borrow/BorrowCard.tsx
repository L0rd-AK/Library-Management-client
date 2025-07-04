import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { returnBook } from "@/redux/featurs/borrow/borrowSlice";
import { useAppDispatch } from "@/redux/hooks";
import { type IBorrow } from "@/types";
import { BookOpen, CheckCircle, Clock } from "lucide-react";

interface IProps {
  borrow: IBorrow;
}

export default function BorrowCard({ borrow }: IProps) {
  const dispatch = useAppDispatch();
  
  const isOverdue = new Date(borrow.returnDate) < new Date() && !borrow.returned;
  const isReturned = borrow.returned;

  const handleReturn = () => {
    dispatch(returnBook(borrow._id));
  };

  return (
    <div className="border px-5 py-3 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              {borrow.bookTitle}
            </h1>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Author:</span> {borrow.author}</p>
            <p><span className="font-medium">Genre:</span> {borrow.genre}</p>
            <p><span className="font-medium">ISBN:</span> {borrow.isbn}</p>
            <p><span className="font-medium">Copies Borrowed:</span> {borrow.borrowedCopies}</p>
            <p><span className="font-medium">Borrow Date:</span> {new Date(borrow.borrowDate).toLocaleDateString()}</p>
            <p><span className="font-medium">Return Date:</span> {new Date(borrow.returnDate).toLocaleDateString()}</p>
            <p><span className="font-medium">Status:</span> 
              <span className={cn("ml-1 px-2 py-1 rounded-full text-xs font-medium", {
                "bg-green-100 text-green-800": isReturned,
                "bg-yellow-100 text-yellow-800": !isReturned && !isOverdue,
                "bg-red-100 text-red-800": isOverdue,
              })}>
                {isReturned ? 'Returned' : isOverdue ? 'Overdue' : 'Borrowed'}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center ml-4">
          {!isReturned && (
            <Button
              onClick={handleReturn}
              variant="outline"
              size="sm"
              className="text-green-600 hover:text-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Return
            </Button>
          )}
          {isOverdue && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <Clock className="h-4 w-4" />
              Overdue
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 