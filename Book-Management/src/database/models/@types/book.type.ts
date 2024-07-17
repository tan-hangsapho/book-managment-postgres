export interface IBook {
  title?: string;
  author?: string;
  category?: string;
  publicationDate?: Date;
  pages?: number;
  price?: number;
  inStock?: boolean;
}

export interface IBookUpdate {
  title?: string;
  author?: string;
  category?: string;
  publicationDate?: Date;
  pages?: number;
  price?: number;
  inStock?: boolean;
  updatedAt?: Date;
}
