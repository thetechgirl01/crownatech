import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" border-t border-gray-800 bg-transparent h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-6 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} CrownaTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;