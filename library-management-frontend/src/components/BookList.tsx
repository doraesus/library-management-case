import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchBooksRequest } from '../redux/actions/bookActions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bookList: books, loading, error } = useAppSelector((state) => state.books);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    dispatch(fetchBooksRequest());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <div>Error: {error}</div>;

  const paginatedBooks = books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Books
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedBooks.map((book) => (
            <TableRow
              key={book.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={books.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};

export default BookList;
