import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBookByIdQuery, useUpdateBookMutation } from '@/redux/featurs/api/booksApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const editBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().min(1, 'Genre is required'),
  isbn: z.string().min(1, 'ISBN is required'),
  description: z.string().min(1, 'Description is required'),
  copies: z.number().min(0, 'Copies must be 0 or greater'),
});

type EditBookFormData = z.infer<typeof editBookSchema>;

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditBookFormData>({
    resolver: zodResolver(editBookSchema),
  });

  useEffect(() => {
    if (book) {
      reset({
        title: book.data.title,
        author: book.data.author,
        genre: book.data.genre,
        isbn: book.data.isbn,
        description: book.data.description,
        copies: book.data.copies,
      });
    }
  }, [book, reset]);

  const onSubmit = async (data: EditBookFormData) => {
    if (!book) return;

    try {
      const bookData = {
        ...book.data,
        ...data,
        available: data.copies > 0,
      };
      
      await updateBook(bookData).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading book...</div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Error loading book. Please try again.</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Book Information</CardTitle>
            <CardDescription>
              Update the details below to modify the book information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Enter Title"
                    defaultValue={book.data.title}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    {...register('author')}
                    placeholder="Enter author name"
                    defaultValue={book.data.author}
                  />
                  {errors.author && (
                    <p className="text-sm text-red-600">{errors.author.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">Genre *</Label>
                  <Input
                    id="genre"
                    {...register('genre')}
                    placeholder="Enter genre"
                    defaultValue={book.data.genre}
                  />
                  {errors.genre && (
                    <p className="text-sm text-red-600">{errors.genre.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN *</Label>
                  <Input
                    id="isbn"
                    {...register('isbn')}
                    placeholder="Enter ISBN"
                    defaultValue={book.data.isbn}
                  />
                  {errors.isbn && (
                    <p className="text-sm text-red-600">{errors.isbn.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="copies">Number of Copies *</Label>
                  <Input
                    id="copies"
                    type="number"
                    {...register('copies', { valueAsNumber: true })}
                    placeholder="Enter number of copies"
                    min="0"
                    defaultValue={book.data.copies}
                  />
                  {errors.copies && (
                    <p className="text-sm text-red-600">{errors.copies.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter book description"
                  rows={4}
                  defaultValue={book.data.description}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Update Book'}
                </Button>
                <Link to="/">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditBook; 