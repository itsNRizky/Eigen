import { BookRepository } from '../../infrastructure/repositories/BookRepository';
import { MemberRepository } from '../../infrastructure/repositories/MemberRepository';

export class ReturningService {
  constructor(
    private memberRepository: MemberRepository,
    private bookRepository: BookRepository
  ) {}

  async execute(
    memberCode: string,
    bookCode: string,
    returnDate: Date
  ): Promise<Date | null> {
    const member = await this.memberRepository.findByCode(memberCode);
    const book = await this.bookRepository.findByCode(bookCode);

    if (!member) {
      throw new Error('Member not found');
    }

    if (!book) {
      throw new Error('Book not found');
    }

    member.returnBook(book, returnDate);
    await this.memberRepository.save(member);
    await this.bookRepository.save(book);

    return member.penaltyEndDate;
  }
}
