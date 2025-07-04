import { Link } from 'react-router-dom';
import { BookOpen, Plus, BarChart3 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Library Management
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200 flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            All Books
          </Link>
          <Link to="/create-book" className="hover:text-blue-200 flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Book
          </Link>
          <Link to="/borrow-summary" className="hover:text-blue-200 flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Borrow Summary
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
