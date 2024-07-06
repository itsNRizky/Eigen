import { Request, Response, Router } from 'express';
import { BookController } from '../controllers/BookController';
import { LibraryService } from '../../../application/LibraryService';
import { BorrowingService } from '../../../domain/services/BorrowingService';
import { ReturningService } from '../../../domain/services/ReturningService';
import { MemberRepository } from '../../../infrastructure/repositories/MemberRepository';
import { BookRepository } from '../../../infrastructure/repositories/BookRepository';

const router = Router();
const memberRepository = new MemberRepository();
const bookRepository = new BookRepository();
const borrowingService = new BorrowingService(memberRepository, bookRepository);
const returningService = new ReturningService(memberRepository, bookRepository);
const libraryService = new LibraryService(
  borrowingService,
  returningService,
  bookRepository
);
const bookController = new BookController(libraryService);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for books in the library system
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: All books listed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 */
router.get('/', async (req: Request, res: Response) =>
  bookController.getAllBooks(req, res)
);

/**
 * @swagger
 * /api/books/borrow:
 *   post:
 *     summary: Member borrow a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post('/borrow', async (req: Request, res: Response) =>
  bookController.borrowBook(req, res)
);

/**
 * @swagger
 * /api/books/return:
 *   post:
 *     summary: Member return a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *               returnDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post('/return', async (req: Request, res: Response) =>
  bookController.returnBook(req, res)
);

export default router;
