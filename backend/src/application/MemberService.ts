import { Member } from '../domain/entities/Member';
import { MemberRepository } from '../infrastructure/repositories/MemberRepository';

export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async getAllMembers(): Promise<Member[]> {
    return await this.memberRepository.findAll();
  }
}
