import { client } from '../config/connection'
// console.log(client)
import  {IBook } from '../../interface/book'


export default class BookModel {
  bookAll: string
  bookById: string
  bookSave: string

  constructor() {
    this.bookAll = "SELECT * FROM books"
    this.bookById = "SELECT * FROM books Where id = $1"
    this.bookSave = 'INSERT INTO books(title, price, author, isbn) VALUES ($1, $2, $3, $4) RETURNING *'

  }
  async getAllBooks(): Promise<IBook[]> {
    const result = await client.query(this.bookAll)
    console.log(result.rows)
    // client.end()
    const books = result.rows
    return books as IBook[];
  }

  async getBayIdBook(id:number): Promise<IBook[]> {
    const result = await client.query(this.bookById, [id])
    console.log(result.rows)
    // client.end()
    const book = result.rows
    return book as IBook[]
  }

  async updateBook(sql: string): Promise<IBook[]> {
    const result = await client.query(sql)
    console.log(result.rows)
    // client.end()
    const book = result.rows
    return book as IBook[]
  }

  async save(value:IBook): Promise<IBook[]> {
    let books = [value.title, value.price, value.author, value.isbn]
    const result = await client.query(this.bookSave, books)
    console.log(result.rowCount)
    const book = result.rows
    return book as IBook[]
  }

  async delete(sql: string): Promise<IBook[]>{
    const result = await client.query(sql)
    console.log(result.rowCount)
    const book = result.rows
    return book as IBook[]
  }

}

// const books = new BookModel()
// books.getAllBooks("SELECT * FROM books")
// books.getBayIdBook("SELECT * FROM books Where id = 1")
// const text = 'INSERT INTO books(title, price, author, isbn) VALUES ($1, $2, $3, $4) RETURNING *'
// const values = ["Dinosaur Brains", 19.58, "Albert J. Bernstein", "978-0345410214"]
// books.save(text, values)
//books.delete("DELETE FROM books WHERE id = 5")
//books.updateBook("UPDATE books SET title = 'Dinosaur Brains', price=19.58, author = 'Albert J. Bernstein', isbn = '978-0345410214' WHERE id = 4");


