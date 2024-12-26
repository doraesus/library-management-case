import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchBookDetailsRequest } from '../redux/actions/bookActions';
import { borrowBookRequest, fetchEligibleUsersRequest } from '../redux/actions/userActions';
import { Box, Typography, CircularProgress, Paper, Button, Card, CardContent, Divider } from '@mui/material';
import BorrowBookModal from './BorrowBookModal';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { bookDetails: book, loading, error } = useAppSelector((state) => state.books);
  const { eligibleUsers: availableUsers } = useAppSelector((state) => state.users);

  const [borrowModalVisible, setBorrowModalVisible] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchEligibleUsersRequest());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookDetailsRequest(Number(id)));
    }
  }, [dispatch, id]);

  const handleBorrowBook = (userId: number) => {
    if (!id) return;
    dispatch(
      borrowBookRequest({
        userId,
        bookId: Number(id),
      })
    );
    setBorrowModalVisible(false);
    dispatch(fetchBookDetailsRequest(Number(id)));
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography variant="h6" color="error" textAlign="center">{`Error: ${error}`}</Typography>;

  if (!book) return null;

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <Paper sx={{ padding: 3, marginBottom: 3, backgroundColor: '#ffffff' }} elevation={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {book.name}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" sx={{ color: 'gray', marginTop: 1 }}>
          Book Details
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#222680' }}>
              Book Status
            </Typography>
            {book.isBorrowed && book.borrowerInfo ? (
              <Typography variant="body1">
                Borrowed by: {book.borrowerInfo.userName}
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                <Typography variant="body1">This book is available for lending.</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setBorrowModalVisible(true)}
                  sx={{ marginLeft: 2 }}
                >
                  Lend this Book
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      <BorrowBookModal
        open={borrowModalVisible}
        onClose={() => setBorrowModalVisible(false)}
        onBorrow={handleBorrowBook}
        availableUsers={availableUsers}
      />
    </Box>
  );
};

export default BookDetails;
