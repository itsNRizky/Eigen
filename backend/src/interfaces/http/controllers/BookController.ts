import { Request, Response } from 'express';
import { LibraryService } from '../../../application/LibraryService';
import { fail, ok } from '../utils/response';

export class BookController {
  constructor(private libraryService: LibraryService) {}

  async borrowBook(req: Request, res: Response) {
    try {
      const { memberCode, bookCode } = req.body;
      await this.libraryService.borrowBook(memberCode, bookCode);
      ok(res, {}, 'Book borrowed');
    } catch (error) {
      fail(res, error);
    }
  }

  async returnBook(req: Request, res: Response) {
    try {
      const { memberCode, bookCode, returnDate } = req.body;
      const penaltyEndDate = await this.libraryService.returnBook(
        memberCode,
        bookCode,
        returnDate
      );
      if (penaltyEndDate) {
        ok(res, { penaltyEndDate }, 'Book returned with penalty');
      } else {
        ok(res, {}, 'Book returned');
      }
    } catch (error) {
      fail(res, error);
    }
  }

  async getAllBooks(req: Request, res: Response) {
    try {
      const books = await this.libraryService.getAllBooks();
      ok(res, books);
    } catch (error) {
      fail(res, error);
    }
  }
}
