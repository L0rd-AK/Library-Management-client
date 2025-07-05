# 📚 Library Management System

A modern, full-featured library management application built with React, TypeScript, and Redux Toolkit. This application provides a comprehensive solution for managing books, tracking borrows, and maintaining library inventory with a beautiful, responsive UI that supports both light and dark themes.

![Library Management System](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0.0-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?logo=redux)

## ✨ Features

### 📖 Book Management
- **Add New Books**: Create new book entries with title, author, genre, ISBN, description, and copy count
- **Edit Books**: Update existing book information with a user-friendly form
- **Delete Books**: Remove books from the library with confirmation dialogs
- **View All Books**: Browse the complete library catalog in a responsive table format
- **Book Details**: Comprehensive book information including availability status

### 🔄 Borrowing System
- **Borrow Books**: Check out books with quantity selection and due date setting
- **Return Books**: Mark books as returned with automatic status updates
- **Borrow Summary**: Track all borrowing activities with detailed statistics
- **Overdue Tracking**: Automatic detection and highlighting of overdue books
- **Availability Status**: Real-time updates of book availability based on copies

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes with persistent preferences
- **Modern UI**: Built with Radix UI components and Tailwind CSS for a polished look
- **Loading States**: Smooth loading indicators and error handling
- **Form Validation**: Comprehensive form validation using Zod schemas

### 🔧 Technical Features
- **State Management**: Redux Toolkit with RTK Query for efficient API calls
- **Type Safety**: Full TypeScript implementation for better development experience
- **API Integration**: RESTful API integration with automatic cache invalidation
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router for seamless navigation
- **Persistence**: Redux Persist for maintaining state across sessions

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Backend API server running (see backend repository for setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   │   ├── Book/       # Book-related components
│   │   └── Borrow/     # Borrow-related components
│   └── shared/         # Shared components (navbar, etc.)
├── pages/              # Page components
│   ├── Books.tsx       # Main books listing page
│   ├── CreateBook.tsx  # Add new book page
│   ├── EditBook.tsx    # Edit book page
│   ├── BorrowBook.tsx  # Borrow book page
│   └── BorrowSummary.tsx # Borrow summary page
├── redux/              # Redux store and slices
│   ├── featurs/        # Feature slices
│   │   ├── api/        # RTK Query API definitions
│   │   ├── book/       # Book slice
│   │   └── borrow/     # Borrow slice
│   ├── hooks.ts        # Redux hooks
│   └── store.ts        # Store configuration
├── types/              # TypeScript type definitions
├── routes/             # Routing configuration
├── providers/          # Context providers
└── lib/                # Utility functions
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Technologies

### Frontend
- **React 19.1.0** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.0.0** - Build tool and dev server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives

### State Management & Data
- **Redux Toolkit 2.8.2** - State management
- **RTK Query** - API data fetching and caching
- **React Hook Form 7.59.0** - Form handling
- **Zod 3.25.73** - Schema validation

### UI Components
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Class merging utility

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

### Theme Configuration

The application supports both light and dark themes. Theme preferences are automatically saved to localStorage and persist across sessions.

## 📱 Features in Detail

### Book Management
- **Add Books**: Complete form with validation for all book fields
- **Edit Books**: Pre-populated forms for easy editing
- **Delete Books**: Confirmation dialogs to prevent accidental deletions
- **Real-time Updates**: Automatic cache invalidation for immediate UI updates

### Borrowing System
- **Smart Borrowing**: Prevents borrowing more copies than available
- **Due Date Management**: Automatic due date calculation and validation
- **Status Tracking**: Real-time status updates (borrowed, returned, overdue)
- **Borrow History**: Complete history of all borrowing activities

### User Experience
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Built with accessibility in mind using Radix UI
- **Performance**: Optimized with React 19 features and efficient state management
- **Error Handling**: Comprehensive error states and user feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icon set
- [Redux Toolkit](https://redux-toolkit.js.org/) for efficient state management

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ using modern web technologies**
