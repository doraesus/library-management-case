
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INT DEFAULT 0,
    activeBorrowedBookId INT NULL,
    FOREIGN KEY (activeBorrowedBookId) REFERENCES Books(id)
);


CREATE TABLE Books (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    isBorrowed BOOLEAN DEFAULT FALSE,
    averageScore FLOAT DEFAULT 0
);


CREATE TABLE BorrowedBooks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    BookId INT NOT NULL,
    borrowDate DATE DEFAULT CURRENT_DATE,
    returnDate DATE NULL,
    score FLOAT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(id),
    FOREIGN KEY (BookId) REFERENCES Books(id)
);
