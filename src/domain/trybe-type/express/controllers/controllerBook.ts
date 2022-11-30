import { Request, Response } from "express";
import statusCodes from "../statusCodes"
import BookService from "../services/booksServices"
import { IBook } from "../interface/book";

export default class BookController {

  constructor(private booksServices = new BookService()) {

  }

  public getAllBooks = async(_req: Request, res: Response) => {
    const book = await this.booksServices.getAllBooks();
    res.status(statusCodes.OK).json(book);
  };

  public getBayIdBook = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const book = await this.booksServices.getBayIdBook(id)

    if(!book.length) {
      return res.status(statusCodes.NOT_FOUND)
        .json({ message: 'Book not found'})
    }
    res.status(statusCodes.OK).json(book)
  }

  public save = async (req: Request, res: Response) => {
    const book = req.body as IBook
    const result = await this.booksServices.save(book)
    return res.status(statusCodes.OK).json(result)
  }



}