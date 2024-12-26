import React, { useState } from 'react';
import { Modal, Typography, Input, Button, Box } from '@mui/material';

interface ReturnBookModalProps {
  open: boolean;
  onClose: () => void;
  onReturn: (score: number) => void;
}

const ReturnBookModal: React.FC<ReturnBookModalProps> = ({ open, onClose, onReturn }) => {
  const [score, setScore] = useState<string>('');

  const handleReturn = () => {
    const parsedScore = parseFloat(score);
    if (!isNaN(parsedScore)) {
      onReturn(parsedScore);
      setScore('');
      onClose();
    } else {
      alert('Please enter a valid score.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" sx={{ marginBottom: 2 }}>
          Return Book
        </Typography>
        <Input
          placeholder="Enter score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          sx={{ marginBottom: 2, width: '100%' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleReturn}
          disabled={!score.trim()}
          sx={{ marginRight: 2 }}
        >
          Return
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ReturnBookModal;
