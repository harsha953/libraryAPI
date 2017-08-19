var bookController = function(Book){

    var addBook = function(req, res){//http://localhost:4000/api/books -POST-To add book to db
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    };
    var getBooks = function(req, res){// http://localhost:4000/api/books - to get all books
        //http://localhost:4000/api/books?genre=fiction
        var query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        Book.find(query, function(err, books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    };
    var getBookById = function(req, res){
        res.json(req.book);
    };
    var updateBookById = function(req, res){
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.book);
            }
        });
    };
    var updateBookAttributeById = function(req, res){
        if(req.body._id)
            delete req.body_id;
        for(var p in req.body){
            req.book[p] = req.body[p];
        }
        req.book.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.book);
            }
        });
    };
    var deleteById = function(req, res){
        req.book.remove(function(err){
            if(err)
                res.status(500).send(err);
            else
                res.status(204).send('Removed Book');
        });
    };
    return{
        addBook:addBook,
        getBooks:getBooks,
        getBookById:getBookById,
        updateBookById:updateBookById,  //put
        updateBookAttributeById:updateBookAttributeById,  //patch
        deleteById:deleteById
    }
}

module.exports = bookController;