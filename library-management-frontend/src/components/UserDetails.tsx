import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUserDetailsRequest, returnBookRequest } from '../redux/actions/userActions';
import { Box, Typography, CircularProgress, Paper, Card, CardContent, Divider, Button, Modal, Input } from '@mui/material';
import ReturnBookModal from './ReturnBookModal'; // Adjust the path as necessary
import { toast } from 'react-toastify';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { userDetails: user, loading, error } = useAppSelector((state) => state.users);
  const [bookScoreModalVisible, setBookScoreModalVisible] = useState<boolean>(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetailsRequest(Number(id)));
    }
  }, [dispatch, id]);

  const handleReturnBook = (bookId: number, score: number) => {
    if (!id) return;
    dispatch(
      returnBookRequest({
        userId: Number(id),
        bookId,
        score,
      })
    );
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );

  if (error) {
    toast.error(`Error: ${error}`);
    return <Typography variant="h6" color="error" textAlign="center">{`Error: ${error}`}</Typography>;
  }

  if (!user) return null;

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <Paper sx={{ padding: 3, marginBottom: 3, backgroundColor: '#ffffff' }} elevation={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {user.name}'s Borrowed Books
        </Typography>
        <Divider />
        <Typography variant="subtitle1" sx={{ color: 'gray', marginTop: 1 }}>
          Details of books currently and previously borrowed by the user.
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#222680' }}>
              Currently Borrowed
            </Typography>
            {user.books!.present.length > 0 ? (
              user.books!.present.map((book, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                  <Typography variant="body1">{book.name}</Typography>
                  <Button
                    onClick={() => {
                      setSelectedBookId(book.id);
                      setBookScoreModalVisible(true);
                    }}
                  >
                    Return
                  </Button>
                  <ReturnBookModal
                    open={bookScoreModalVisible}
                    onClose={() => setBookScoreModalVisible(false)}
                    onReturn={(score) => {
                      if (selectedBookId !== null) {
                        handleReturnBook(selectedBookId, score);
                      }
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ color: 'gray' }}>
                No books currently borrowed.
              </Typography>
            )}
          </CardContent>
        </Card>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#222680' }}>
              Previously Borrowed
            </Typography>
            {user.books!.past.length > 0 ? (
              <ul style={{ paddingLeft: '20px' }}>
                {user.books!.past.map((book, index) => (
                  <li key={index} style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {book.name} - <strong>Score:</strong> {book.userScore}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body1" sx={{ color: 'gray' }}>
                No previously borrowed books.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

    </Box>
  );
};

export default UserDetails;
