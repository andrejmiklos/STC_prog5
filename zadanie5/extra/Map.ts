// imports file system
import fs from "fs";
// imports type book
import { Book } from "./typeBook";
// exports maps
export let map = new Map();
export let map2 = new Map();

/**
 * @param myBooks makes constant from information read from file Book.json
 * @param JBooks parse information from constant myBooks to string and defines it's type to Book
 */
const myBooks = fs.readFileSync("Books.json")
export let JBooks: Book[] = JSON.parse(myBooks.toString());

/**
 * function called wholeInfo
 * JBooks.forEach checks every element in JBooks
 * map.set makes keys and gives them values based on values in that element
 */
export function wholeInfo() {
    JBooks.forEach( element => {
        map.set(element.id, element);
    });
};

/**
 * function called someInfo
 * JBooks.forEach checks every element in JBooks
 * map2.set makes keys and gives them exact values
 */
export function someInfo() {
    JBooks.forEach( element => {
        map2.set(element.id, [element.id, element.name, element.author, element.genre])
    });
};