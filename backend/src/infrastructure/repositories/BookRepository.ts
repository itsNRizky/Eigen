import { PrismaClient } from '@prisma/client';
import { Book } from '../../domain/entities/Book';

const prisma = new PrismaClient();

export class BookRepository {
  async findAll(): Promise<Book[]> {
    try {
      const books = await prisma.book.findMany();
      if (!books) {
        return [];
      }
      const bookObjects = books.map((book) => {
        return new Book(
          book.code,
          book.title,
          book.author,
          book.stock,
          book.isBorrowed,
          book.memberCode
        );
      });
      return bookObjects;
    } catch (error) {
      throw error;
    }
  }

  async findByCode(code: string): Promise<Book | null> {
    try {
      const book = await prisma.book.findUnique({ where: { code } });
      if (!book) {
        return null;
      }
      return new Book(
        book.code,
        book.title,
        book.author,
        book.stock,
        book.isBorrowed,
        book.memberCode
      );
    } catch (error) {
      throw error;
    }
  }

  async save(book: Book): Promise<void> {
    try {
      await prisma.book.upsert({
        where: { code: book.code },
        update: book,
        create: book,
      });
    } catch (error) {
      throw error;
    }
  }
}
