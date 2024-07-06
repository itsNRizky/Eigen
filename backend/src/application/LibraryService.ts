import { Book } from '../domain/entities/Book';
import { BorrowingService } from '../domain/services/BorrowingService';
import { ReturningService } from '../domain/services/ReturningService';
import { BookRepository } from '../infrastructure/repositories/BookRepository';

export class LibraryService {
  constructor(
    private borrowingService: BorrowingService,
    private returningService: ReturningService,
    private bookRepository: BookRepository
  ) {}

  async borrowBook(memberCode: string, bookCode: string): Promise<void> {
    await this.borrowingService.execute(memberCode, bookCode);
  }

  async returnBook(
    memberCode: string,
    bookCode: string,
    returnDate: Date
  ): Promise<Date | null> {
    return await this.returningService.execute(
      memberCode,
      bookCode,
      returnDate
    );
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }
}
