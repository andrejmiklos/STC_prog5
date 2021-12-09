/**
 * defines type book and it's rules
 *  names of variables and their types 
 */
 export type Book = {
    id: Number,
    name: String,
    author: String[],
    genre: String[],
    year: Number,
    publishers: String,
    country: String,
    pages: Number
};