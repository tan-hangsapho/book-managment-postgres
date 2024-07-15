import mongoose from "mongoose";

export interface IBook {
  title?: string;
  author?: mongoose.Types.ObjectId;
  category?: mongoose.Types.ObjectId;
  publicationDate?: Date;
  pages?: number;
  price?: number;
  inStock?: boolean;
  createAt: Date;
}
export interface IBookUpdate {
  title?: string;
  publicationDate?: Date;
  pages?: number;
  price?: number;
  updatedDate?: Date;
}
