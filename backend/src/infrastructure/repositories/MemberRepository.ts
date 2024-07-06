import { PrismaClient } from '@prisma/client';
import { Member } from '../../domain/entities/Member';

const prisma = new PrismaClient();

export class MemberRepository {
  async findAll(): Promise<Member[]> {
    try {
      const members = await prisma.member.findMany({
        include: {
          borrowedBooks: true,
        },
      });
      if (!members) {
        return [];
      }
      const memberObjects = members.map((member) => {
        return new Member(
          member.code,
          member.name,
          member.penaltyEndDate,
          member.borrowedBooks
        );
      });

      return memberObjects;
    } catch (error) {
      throw error;
    }
  }

  async findByCode(code: string): Promise<Member | null> {
    try {
      const member = await prisma.member.findUnique({
        where: { code },
        include: {
          borrowedBooks: true,
        },
      });
      if (!member) {
        return null;
      }

      return new Member(
        member.code,
        member.name,
        member.penaltyEndDate,
        member.borrowedBooks
      );
    } catch (error) {
      throw error;
    }
  }

  async save(member: Member): Promise<void> {
    console.log(member);
    try {
      await prisma.member.upsert({
        where: { code: member.code },
        update: {
          code: member.code,
          name: member.name,
          penaltyEndDate: member.penaltyEndDate,
        },
        create: {
          code: member.code,
          name: member.name,
          penaltyEndDate: member.penaltyEndDate,
        },
      });

      await prisma.book.updateMany({
        where: {
          code: { in: member.borrowedBooks.map((book) => book.code) },
        },
        data: { memberCode: member.code },
      });
    } catch (error) {
      throw error;
    }
  }
}
