export class Book {
  constructor(
    public code: string,
    public title: string,
    public author: string,
    public stock: number,
    public isBorrowed: Date | null = null,
    public memberCode: string | null = null
  ) {}
}

export const swaggerBookSchema = {
  type: 'object',
  properties: {
    code: { type: 'string', description: 'The auto-generated id of the book' },
    title: { type: 'string', description: 'The title of the book' },
    author: { type: 'string', description: 'The author of the book' },
    stock: { type: 'integer', description: 'The stock of the book' },
    isBorrowed: {
      type: 'string',
      nullable: true,
      description: 'The borrowed date of the book',
    },
    memberCode: {
      type: 'string',
      nullable: true,
      description: 'The member code who borrow the book',
    },
  },
  example: {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J. R. R. Tolkien',
    stock: 1,
    isBorrowed: null,
    memberCode: null,
  },
};
