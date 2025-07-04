import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBooksQuery } from '@/redux/featurs/api/booksApi';
import { useBorrowBookMutation } from '@/redux/featurs/api/borrowApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, addDays } from 'date-fns';

const borrowBookSchema = z.object({
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  dueDate: z.string().min(1, 'Due date is required'),
}).refine((data) => {
  const dueDate = new Date(data.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dueDate >= today;
}, {
  message: "Due date must be today or in the future",
  path: ["dueDate"],
});

type BorrowBookFormData = z.infer<typeof borrowBookSchema>;

const BorrowBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  const { data: booksData } = useGetBooksQuery();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  
  const books = booksData?.data || [];
  const book = books.find(b => b._id === bookId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BorrowBookFormData>({
    resolver: zodResolver(borrowBookSchema),
    defaultValues: {
      quantity: 1,
      dueDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'), // Default to 2 weeks from now
    },
  });

  const quantity = watch('quantity');

  const onSubmit = async (data: BorrowBookFormData) => {
    if (!book) return;

    // Check if quantity exceeds available copies
    if (data.quantity > book.copies) {
      alert(`Cannot borrow ${data.quantity} copies. Only ${book.copies} copies are available.`);
      return;
    }

    try {
      // Send borrow request to API
      await borrowBook({
        bookId: book._id as string,
        quantity: data.quantity,
        dueDate: data.dueDate
      }).unwrap();
      
      navigate('/borrow-summary');
    } catch (error) {
      console.error('Failed to borrow book:', error);
    }
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Book not found. Please try again.</div>
      </div>
    );
  }

  if (!book.available) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-red-600 mb-2">Book Not Available</h2>
                <p className="text-gray-600 mb-4">
                  "{book.title}" is currently not available for borrowing.
                </p>
                <Link to="/">
                  <Button>Back to Books</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Borrow Book</h1>
        </div>

        <div className="grid gap-6">
          {/* Book Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Book Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Title</Label>
                  <p className="text-lg font-semibold">{book.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Author</Label>
                  <p className="text-lg">{book.author}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Genre</Label>
                  <p className="text-lg">{book.genre}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">ISBN</Label>
                  <p className="text-lg">{book.isbn}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Available Copies</Label>
                  <p className="text-lg font-semibold text-green-600">{book.copies}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Borrow Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Borrow Details</CardTitle>
              <CardDescription>
                Enter the quantity you want to borrow and the due date.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      {...register('quantity', { valueAsNumber: true })}
                      min="1"
                      max={book.copies}
                      placeholder="Enter quantity"
                    />
                    {errors.quantity && (
                      <p className="text-sm text-red-600">{errors.quantity.message}</p>
                    )}
                    {quantity > book.copies && (
                      <p className="text-sm text-red-600">
                        Cannot borrow more than {book.copies} copies
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      {...register('dueDate')}
                      min={format(new Date(), 'yyyy-MM-dd')}
                    />
                    {errors.dueDate && (
                      <p className="text-sm text-red-600">{errors.dueDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? 'Borrowing...' : 'Borrow Book'}
                  </Button>
                  <Link to="/" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook; 