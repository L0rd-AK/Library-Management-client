import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, BarChart3, Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/ui/moodToggler';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto">
        {/* Desktop Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="hidden sm:inline">Library Management</span>
            <span className="sm:hidden">Library</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 flex items-center gap-1 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>All Books</span>
            </Link>
            <Link to="/create-book" className="hover:text-blue-200 flex items-center gap-1 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Book</span>
            </Link>
            <Link to="/borrow-summary" className="hover:text-blue-200 flex items-center gap-1 transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span>Borrow Summary</span>
            </Link>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-200 hover:bg-blue-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-500">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/" 
                className="hover:text-blue-200 flex items-center gap-2 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <BookOpen className="h-4 w-4" />
                <span>All Books</span>
              </Link>
              <Link 
                to="/create-book" 
                className="hover:text-blue-200 flex items-center gap-2 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </Link>
              <Link 
                to="/borrow-summary" 
                className="hover:text-blue-200 flex items-center gap-2 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Borrow Summary</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
