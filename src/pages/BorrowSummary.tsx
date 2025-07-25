import { useGetBorrowsQuery } from '@/redux/featurs/api/borrowApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import BorrowCard from '@/components/modules/Borrow/BorrowCard';
import { type IBorrow } from '@/types';

const BorrowSummary = () => {
  const { data: borrowsData, isLoading, error } = useGetBorrowsQuery();

  // Extract borrows from the API response structure
  const borrows: IBorrow[] = borrowsData?.data || [];

  // Debug logging
  console.log('borrowsData:', borrowsData);
  console.log('borrows (processed):', borrows);
  console.log('isArray(borrows):', Array.isArray(borrows));

  const activeBorrows = borrows.filter((borrow: IBorrow) => borrow.status === 'active');
  console.log('activeBorrows:', activeBorrows);
  const returnedBorrows = borrows.filter((borrow: IBorrow) => borrow.status === 'returned');
  const overdueBorrows = borrows.filter((borrow: IBorrow) => 
    new Date(borrow.dueDate) < new Date() && borrow.status === 'active'
  );

  const totalBorrowed = borrows.reduce((sum: number, borrow: IBorrow) => sum + borrow.quantity, 0);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading borrow summary...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-red-600 mb-2">Error loading borrow summary</h3>
          <p className="text-gray-600 dark:text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Borrow Summary</h1>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Borrows</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{borrows.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Copies</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalBorrowed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Borrows</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeBorrows.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{overdueBorrows.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Borrows */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Active Borrows</CardTitle>
          <CardDescription>
            Books currently borrowed and not yet returned.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeBorrows.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Active Borrows</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                There are currently no active book borrows.
              </p>
              <Link to="/">
                <Button>Browse Books</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBorrows.map((borrow: IBorrow) => (
                <BorrowCard key={borrow._id} borrow={borrow} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Returned Borrows */}
      {returnedBorrows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Returned Books</CardTitle>
            <CardDescription>
              Books that have been returned to the library.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {returnedBorrows.map((borrow: IBorrow) => (
                <BorrowCard key={borrow._id} borrow={borrow} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BorrowSummary; 