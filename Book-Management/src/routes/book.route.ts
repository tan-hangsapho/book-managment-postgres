import { Response, Request, NextFunction, Router } from "express";
import { BookController } from "../controllers/book.controller";

export const bookRoute = Router();
const bookController = new BookController();

bookRoute.post("/books", (req: Request, res: Response, next: NextFunction) =>
  bookController.createBook(req, res, next)
);
bookRoute.get("/books", (req: Request, res: Response, next: NextFunction) =>
  bookController.getAllBooks(req, res, next)
);
bookRoute.get("/books/:id", (req: Request, res: Response, next: NextFunction) =>
  bookController.getBookById(req, res, next)
);
bookRoute.patch(
  "/books/:id",
  (req: Request, res: Response, next: NextFunction) =>
    bookController.updateBook(req, res, next)
);
bookRoute.delete(
  "/books/:id",
  (req: Request, res: Response, next: NextFunction) =>
    bookController.deleteBook(req, res, next)
);
