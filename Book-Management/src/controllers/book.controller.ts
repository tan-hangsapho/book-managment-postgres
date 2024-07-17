import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service"; // Adjust the path according to your project structure
import { IBook, IBookUpdate } from "../database/models/@types/book.type";
import APIError from "../errors/api-error";
import { StatusCode } from "../utils/consts/status-code";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  public createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const bookData: IBook = req.body;
    try {
      const newBook = await this.bookService.createBook(bookData);
      return res
        .status(StatusCode.Created)
        .json({ message: "Book created successfully", data: bookData });
    } catch (error: any) {
      next(error);
    }
  };

  public getAllBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const books = await this.bookService.getAllBooks();
      if (!books) {
        throw new APIError("No books found", StatusCode.NotFound);
      }
      return res.json({ message: "Get All Books Successfully", data: books });
    } catch (error: any) {
      next(error);
    }
  };

  public getBookById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      const book = await this.bookService.getBookById(Number(id));
      if (!book) {
        throw new APIError("Book not found", StatusCode.NotFound);
      }
      return res
        .status(StatusCode.Found)
        .json({ message: "Get Book Sucessfully", data: book });
    } catch (error: any) {
      next(error);
    }
  };

  public updateBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const updateData: IBookUpdate = req.body;
    try {
      const [numberOfAffectedRows, affectedRows] =
        await this.bookService.updateBook(Number(id), updateData);
      if (numberOfAffectedRows > 0) {
        res.status(200).json(affectedRows[0]);
        return res
          .status(StatusCode.OK)
          .json({ message: "Update book successfully", data: affectedRows[0] });
      } else {
        return res
          .status(StatusCode.NotFound)
          .json({ message: "Book not found" });
      }
    } catch (error: any) {
      next(error);
    }
  };

  public deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      const numberOfDeletedRows = await this.bookService.deleteBook(Number(id));
      if (numberOfDeletedRows > 0) {
        return res
          .status(StatusCode.NoContent)
          .json({ message: "Book deleted successfully" });
      } else {
        return res
          .status(StatusCode.NotFound)
          .json({ message: "Book not found" });
      }
    } catch (error: any) {
      next(error);
    }
  };
}
