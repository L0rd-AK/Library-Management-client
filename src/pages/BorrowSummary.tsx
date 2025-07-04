import { useGetBorrowSummaryQuery } from '@/redux/features/api/borrowApi';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BorrowSummary = () => {
  const { data: borrowSummary = [], isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading borrow summary...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Error loading borrow summary. Please try again.</div>
      </div>
    );
  }

  const totalBorrowed = borrowSummary.reduce((sum, item) => sum + item.totalQuantityBorrowed, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Borrow Summary</h1>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Books Borrowed</p>
                <p className="text-2xl font-bold text-gray-900">{borrowSummary.length}</p>
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
                <p className="text-sm font-medium text-gray-500">Total Copies Borrowed</p>
                <p className="text-2xl font-bold text-gray-900">{totalBorrowed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Borrows</p>
                <p className="text-2xl font-bold text-gray-900">{borrowSummary.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Borrow Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Borrowed Books Summary</CardTitle>
          <CardDescription>
            Overview of all books that have been borrowed from the library.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {borrowSummary.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Books Borrowed</h3>
              <p className="text-gray-500 mb-4">
                There are currently no books borrowed from the library.
              </p>
              <Link to="/">
                <Button>Browse Books</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Title</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead className="text-right">Total Quantity Borrowed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowSummary.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.bookTitle}</TableCell>
                    <TableCell>{item.isbn}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {item.totalQuantityBorrowed}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowSummary; 