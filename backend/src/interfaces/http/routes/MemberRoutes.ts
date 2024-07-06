import { Request, Response, Router } from 'express';
import { MemberController } from '../controllers/MemberController';
import { MemberRepository } from '../../../infrastructure/repositories/MemberRepository';
import { MemberService } from '../../../application/MemberService';

const router = Router();
const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API for members in the library system
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get a list of all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: All members listed successfully
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
 *                     $ref: '#/components/schemas/Member'
 *       400:
 *         description: Bad request
 */
router.get('/', async (req: Request, res: Response) =>
  memberController.getAllMembers(req, res)
);

export default router;
