export interface Book {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  coverImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description: string;
  longDescription?: any[];
  price: number;
  author: string;
  pages?: number;
  exercisesCount?: number;
  ageRangeFrom?: number;
  ageRangeTo?: number;
  featured?: boolean;
  sampleFile?: string;
  tableOfContents?: string[];
}
