import { Book } from './Book';

export class Member {
  constructor(
    public code: string,
    public name: string,
    public penaltyEndDate: Date | null = null,
    public borrowedBooks: Book[]
  ) {}

  borrowBook(book: Book): void {
    const now = new Date();
    const isMemberCanBorrowAmount = this.borrowedBooks.length < 2;

    if (!isMemberCanBorrowAmount) {
      throw new Error('Member cannot borrow more than 2 books');
    }

    if (book.isBorrowed) {
      throw new Error('Book is already borrowed');
    }

    if (this.penaltyEndDate === null) {
      // Member is not under penalty
    } else if (now < this.penaltyEndDate) {
      // Member is under penalty
      throw new Error('Member is under penalty');
    }

    book.isBorrowed = now;
    book.memberCode = this.code;
    book.stock -= 1;
    this.borrowedBooks.push(book);
  }

  returnBook(book: Book, returnDate: Date): Date | null {
    const borrowedByMember = this.borrowedBooks.find(
      (b) => b.code === book.code
    );

    if (!book.isBorrowed) {
      throw new Error('Book is not borrowed');
    }

    const bookBorrowedDate = book.isBorrowed;

    if (!borrowedByMember) {
      throw new Error('Book is not borrowed by this member');
    }

    this.borrowedBooks = this.borrowedBooks.filter((b) => b.code !== book.code);
    book.isBorrowed = null;
    book.memberCode = null;
    book.stock += 1;

    if (
      (new Date(returnDate).getTime() - bookBorrowedDate.getTime()) /
        (1000 * 60 * 60 * 24) >
      7
    ) {
      this.penaltyEndDate = new Date(
        new Date(returnDate).getTime() + 1000 * 60 * 60 * 24 * 3
      );
    }
    return this.penaltyEndDate;
  }
}

export const swaggerMemberSchema = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
      description: 'The auto-generated id of the member',
    },
    name: { type: 'string', description: 'The name of the member' },
    stock: { type: 'integer', description: 'The stock of the book' },
    penaltyEndDate: {
      type: 'string',
      nullable: true,
      description: 'The penalty end date of the member',
    },
    borrowedBooks: {
      type: 'array',
      description: 'The member code who borrow the book',
      items: { $ref: '#/components/schemas/Book' },
    },
  },
  example: {
    code: 'M001',
    name: 'Angga',
    penaltyEndDate: '2024-07-18T19:27:05.864Z',
    borrowedBooks: [],
  },
};
