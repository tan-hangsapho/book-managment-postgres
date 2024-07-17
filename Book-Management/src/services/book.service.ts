import { IBook, IBookUpdate } from "../database/models/@types/book.type";
import { BookRepository } from "../database/repositories/BookRepository";
import APIError from "../errors/api-error";
import { StatusCode } from "../utils/consts/status-code";

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async createBook(bookData: IBook) {
    try {
      return await this.bookRepository.createBook(bookData);
    } catch (error) {
      throw error;
    }
  }

  async getAllBooks() {
    try {
      const books = await this.bookRepository.getAllBooks();
      if (!books.length) {
        throw new APIError("No books found", StatusCode.NotFound);
      }
      return books;
    } catch (error) {
      throw error;
    }
  }

  async getBookById(id: number) {
    try {
      const book = await this.bookRepository.getBookById(id);
      if (!book) {
        throw new APIError("Book not found", StatusCode.NotFound);
      }
      return book;
    } catch (error: any) {
      throw error;
    }
  }

  async updateBook(id: number, updateBook: IBookUpdate) {
    try {
      const updatedBook = await this.bookRepository.updateBook(id, updateBook);
      if (updatedBook[0] === 0) {
        throw new APIError(
          "Failed to update book",
          StatusCode.InternalServerError
        );
      }
      return updatedBook;
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(id: number) {
    try {
      const deleted = await this.bookRepository.deleteBook(id);
      if (deleted === 0) {
        throw new APIError("Book not found", StatusCode.NotFound);
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
