"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.someInfo = exports.wholeInfo = exports.JBooks = exports.map2 = exports.map = void 0;
// imports file system
const fs_1 = __importDefault(require("fs"));
// exports maps
exports.map = new Map();
exports.map2 = new Map();
/**
 * @param myBooks makes constant from information read from file Book.json
 * @param JBooks parse information from constant myBooks to string and defines it's type to Book
 */
const myBooks = fs_1.default.readFileSync("Books.json");
exports.JBooks = JSON.parse(myBooks.toString());
/**
 * function called wholeInfo
 * JBooks.forEach checks every element in JBooks
 * map.set makes keys and gives them values based on values in that element
 */
function wholeInfo() {
    exports.JBooks.forEach(element => {
        exports.map.set(element.id, element);
    });
}
exports.wholeInfo = wholeInfo;
/**
 * function called someInfo
 * JBooks.forEach checks every element in JBooks
 * map2.set makes keys and gives them exact values
 */
function someInfo() {
    exports.JBooks.forEach(element => {
        exports.map2.set(element.id, [element.id, element.name, element.author, element.genre]);
    });
}
exports.someInfo = someInfo;
