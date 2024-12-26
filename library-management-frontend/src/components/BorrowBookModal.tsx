import React, { useState } from 'react';
import { Modal, Typography, Box, Select, MenuItem, Button } from '@mui/material';

interface BorrowBookModalProps {
  open: boolean;
  onClose: () => void;
  onBorrow: (userId: number) => void;
  availableUsers: { id: number; name: string }[];
}

const BorrowBookModal: React.FC<BorrowBookModalProps> = ({ open, onClose, onBorrow, availableUsers }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleBorrow = () => {
    if (selectedUserId) {
      onBorrow(selectedUserId);
      setSelectedUserId(null);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" sx={{ mb: 2 }}>
          Lend Book to a User
        </Typography>
        <Select
          fullWidth
          value={selectedUserId || ''}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a user
          </MenuItem>
          {availableUsers.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleBorrow}
          disabled={!selectedUserId}
        >
          Lend
        </Button>
      </Box>
    </Modal>
  );
};

export default BorrowBookModal;
