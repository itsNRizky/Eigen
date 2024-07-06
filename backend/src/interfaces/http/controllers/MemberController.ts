import { Request, Response } from 'express';
import { MemberService } from '../../../application/MemberService';
import { fail, ok } from '../utils/response';

export class MemberController {
  constructor(private memberService: MemberService) {}

  async getAllMembers(req: Request, res: Response) {
    try {
      const members = await this.memberService.getAllMembers();
      ok(res, members);
    } catch (error) {
      fail(res, error);
    }
  }
}
