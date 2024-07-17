import { IBook, IBookUpdate } from "../models/@types/book.type";
import Book from "../models/book.models";

export class BookRepository {
  public async createBook(bookData: IBook) {
    try {
      const newBook = await Book.create({
        title: bookData.title,
        author: bookData.author,
        category: bookData.category,
        publicationDate: bookData.publicationDate,
        pages: bookData.pages,
        price: bookData.price,
        inStock: bookData.inStock,
      });
      return newBook;
    } catch (error) {
      throw error;
    }
  }

  public async getAllBooks() {
    return await Book.findAll();
  }

  public async getBookById(id: number) {
    try {
      return await Book.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  public async updateBook(id: number, updateData: IBookUpdate) {
    try {
      return await Book.update(updateData, { where: { id }, returning: true });
    } catch (error) {
      throw error;
    }
  }

  public async deleteBook(id: number) {
    try {
      return await Book.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
