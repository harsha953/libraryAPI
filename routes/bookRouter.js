var express = require('express');

var routes = function(Book){
    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(Book);
    
    bookRouter.route('/')
        .post(bookController.addBook)
        .get(bookController.getBooks);
    
    bookRouter.use('/:bookId', function(req, res, next){ //(this is a middleware) client request ->middleware -> Route
        Book.findByIdAsync(req.params.bookId).then(function(book){
            if(book){
                req.book = book;
                next();
            }else{
                res.status(404).send('No Book found');
            }
        }).catch(function(err){
            res.status(500).send(err);
        });
    });

    bookRouter.route('/:bookId')
    .get(bookController.getBookById)
    .put(bookController.updateBookById)
    .patch(bookController.updateBookAttributeById)
    .delete(bookController.deleteById);
    return bookRouter;
};

module.exports = routes;