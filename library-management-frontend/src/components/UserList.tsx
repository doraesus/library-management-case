import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUsersRequest } from '../redux/actions/userActions';
import { User } from '../redux/types/userTypes';
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

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userList: userList, loading, error } = useAppSelector((state) => state.users);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    dispatch(fetchUsersRequest());
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

  const paginatedUsers = userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((user: User) => (
            <TableRow
              key={user.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/users/${user.id}`)}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={userList.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UserList;
