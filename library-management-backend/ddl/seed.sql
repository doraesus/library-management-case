
INSERT INTO Users (id, name, score, activeBorrowedBookId) VALUES
(1, 'Eray Aslan', 10, NULL),
(2, 'Enes Faruk Meniz', 20, 5),
(3, 'Sefa Eren Şahin', 15, NULL),
(4, 'Kadir Mutlu', 5, NULL);

INSERT INTO Books (id, name, isBorrowed, averageScore) VALUES
(1, 'The Hitchhiker''s Guide to the Galaxy', FALSE, 10),
(2, 'I, Robot', FALSE, 5.33),
(3, 'Dune', FALSE, -1),
(4, '1984', FALSE, 7),
(5, 'Brave New World', TRUE, 8);


INSERT INTO BorrowedBooks (UserId, BookId, borrowDate, returnDate, score) VALUES
(2, 2, '2024-01-01', '2024-01-05', 5),
(2, 1, '2024-01-06', '2024-01-10', 10),
(2, 5, '2024-01-15', NULL, NULL),
(3, 2, '2024-01-12', '2024-01-16', 5),
(1, 2, '2024-01-20', '2024-01-25', 6);
