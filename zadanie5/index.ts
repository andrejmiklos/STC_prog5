//BEFORE YOU START DON'T FORGET COMAND CD ZADANIE5

// imports express package
import express from "express";
// imports cors package
import cors from "cors";
// imports json and urlencoded
import { json, urlencoded } from "body-parser";
// imports http
import http from "http";
// imports maps (map, map2) and fuctions (wholeInfo, someInfo, )
import { map, map2, wholeInfo, someInfo} from "./extra/Map";
import { Book } from "./extra/typeBook";
import {JBooks} from "./extra/Map";

// creates variable app
let app;

/** 
* starts functions 
*/
wholeInfo();
someInfo();

/**
 * @http.createServer creates http server
 * @app.get shows shows exact information on defined url
 *  it takes param id from url and changes it's type to number
 *  then it searches for that id in ids of books and then it returns id, name, author and genre of book or message. Both are in json format
 * @app.post return quiet data based on id in defined url
 *  1- it takes param id from url and changes it's type to number
 *      then it searches for that id in ids of books and then it returns every information about book which it has or message. Both are in json format
 *  2- it takes param from body and tries to match it with some part of the name of author in list
 *      if there is match, it filters and then shows info about the book which was written by that author
 *      if there is any match, it shows just empty brackets 
 *  3- it takes param from body and tries to match it with some part of the name of books in list
 *      if there is match, it filters and then shows info about the book with name which includes param from body
 *      if there is any match, it shows just empty brackets 
 * @app.put controls if there is book with generated id
 *  if yes- returns message 
 *  if not- takes generated id, data from body, creates new book and saves it to library (Books.json)
 * @app.delete deletes book from library (Books.json) with id which is in url
 *  if there is no book with id in url- returns message
 */
function createServer() {
    
    app = express();
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false}));
    
    http.createServer(app).listen(1234, () => {
        console.log("Running server on port 1234");
        // http://localhost:1234
    });
    
    
    app.get("/api/library/book/:id/info", (req, res) => {
        // http://localhost:1234/api/library/book/:id/info
        
        const inputid = parseInt(req.params["id"]);
        
        if (map2.has(inputid)) {
            res.json(map2.get(inputid)) 
        } else {
            res.json("Kniha s daným ID neexistuje.")
        }
    });
    
    
    app.post("/api/library/book/:id/info", (req, res) => {
        // http://localhost:1234/api/library/book/:id/info
        
        const inputid2 = parseInt(req.params["id"]);
        
        if (map.has(inputid2)) {
            res.json(map.get(inputid2))
        } else {
            res.json("Kniha s daným ID neexistuje.")
        }
    });


    app.post("/api/library/book/find/author", (req, res) => {
        // http://localhost:1234/api/library/book/find/author
        
        const _reqAuthor = req.body["name"]; 
        const _reqauthor = _reqAuthor.toLowerCase();
        const BooksList1: Book[] = JBooks;
        
        const sameAuthorBooks = BooksList1.filter(element => element.author.toString().toLowerCase().includes(_reqauthor));
        res.json(sameAuthorBooks);
    });

    app.post("/api/library/book/find/name", (req, res) => {
        // http://localhost:1234/api/library/book/find/name
        
        const _reqName = req.body["name"];
        const _reqname = _reqName.toLowerCase();
        const BooksList2: Book[] = JBooks;

        const sameNameBooks = BooksList2.filter(element => element.name.toLowerCase().includes(_reqname));
        res.json(sameNameBooks);
    });
    
    
    app.put("/api/library/book/add", (req, res) => {
        // http://localhost:1234/api/library/book/add

        const randomID = Math.floor(Math.random() * 1000);
        
        if (map.has(randomID)) {
           res.json("Dané ID už bolo použité.") 
        } else {
            const _name = req.body["name"];
            const _author = req.body["author"];
            const _genre = req.body["genre"];
            const _year = req.body["year"];
            const _publishers = req.body["publishers"];
            const _country = req.body["country"];
            const _pages = req.body["pages"];
            
            const data = [{
                id: randomID, 
                name: _name, 
                author: _author, 
                genre: _genre, 
                year: _year, 
                publishers: _publishers, 
                country: _country, 
                pages: _pages
            }];
            
            map.set(randomID, data);            
            const fs = require('fs');
            fs.writeFileSync('Books.json', JSON.stringify(Array.from(map.values()), null, 2));
            
            res.json(map.get(randomID));
        }
    });
    
    
    app.delete("/api/library/book/:id/delete", (req, res) => {
        // http://localhost:1234/api/library/book/:id/delete
        
        const inputid4 = parseInt(req.params["id"]);
        
        if (map.has(inputid4)) {
            map.delete(inputid4);
            const fs = require('fs');
            fs.writeFileSync('Books.json', JSON.stringify(Array.from(map.values()), null, 2));
           
            res.json("Kniha s daným ID sa úspešne odstránila zo zoznamu.");
        } else {
            res.json("Kniha s daným ID neexistuje.");
        }
    });
}

//starts function
createServer();