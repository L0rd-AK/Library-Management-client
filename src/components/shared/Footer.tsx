const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {currentYear} Library Management System. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            Built with React, Redux Toolkit, and Tailwind CSS
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  