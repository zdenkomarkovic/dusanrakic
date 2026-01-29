export interface Seminar {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  longDescription?: any[];
  coverImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  date: string;
  duration?: string;
  location: string;
  price: number;
  maxParticipants?: number;
  instructor?: string;
  topics?: string[];
  status: 'active' | 'full' | 'finished' | 'cancelled';
  featured?: boolean;
}
