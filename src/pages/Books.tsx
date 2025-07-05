import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from '@/redux/featurs/api/booksApi';
import type { IBook } from "@/types";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, BookOpen } from 'lucide-react';
import { AddBookModal } from '@/components/modules/Book/AddBookModal';
// import { DeleteBookConfirmationModal } from '@/components/modules/Book/DeleteBookConfirmationModal';

export const BookList = () => {
  const { data: booksData, isLoading, error } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<IBook | null>(null);

  // Extract books from the API response structure
  const books: IBook[] = booksData?.data || [];

  const handleDeleteClick = (book: IBook) => {
    setBookToDelete(book);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (bookToDelete) {
      try {
        await deleteBook(bookToDelete?._id as string).unwrap();
        setDeleteDialogOpen(false);
        setBookToDelete(null);
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading books...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-red-600 mb-2">Error loading books</h3>
          <p className="text-gray-600 dark:text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Books</h1>
        <AddBookModal />
      </div>

      {!books || books.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No books available</h3>
          <p className="text-gray-600 dark:text-gray-400">Get started by adding your first book to the library.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Copies</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books && books.map((book: IBook) => (
                  <TableRow key={book._id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.copies}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.available 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {book.available ? 'Available' : 'Unavailable'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/edit-book/${book._id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/borrow/${book._id}`}>
                          <Button variant="outline" size="sm" disabled={!book.available}>
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </Link>
                        <AlertDialog open={deleteDialogOpen && bookToDelete?._id === book._id} onOpenChange={setDeleteDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteClick(book)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Book</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{book.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {books && books.map((book: IBook) => (
              <div key={book._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-1">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      <span className="font-medium">Author:</span> {book.author}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      <span className="font-medium">Genre:</span> {book.genre}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      <span className="font-medium">ISBN:</span> {book.isbn}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      <span className="font-medium">Copies:</span> {book.copies}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.available 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {book.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/edit-book/${book._id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/borrow/${book._id}`} className="flex-1">
                    <Button variant="outline" size="sm" disabled={!book.available} className="w-full">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Borrow
                    </Button>
                  </Link>
                  <AlertDialog open={deleteDialogOpen && bookToDelete?._id === book._id} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteClick(book)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Book</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{book.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}; 