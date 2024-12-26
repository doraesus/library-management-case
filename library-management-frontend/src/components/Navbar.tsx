import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f4f4f4' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Users</Link>
      <Link to="/books">Books</Link>
    </nav>
  );
};

export default Navbar;
