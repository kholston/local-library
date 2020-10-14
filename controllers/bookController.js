var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

const {body, validationResult} = require('express-validator')

exports.index = (req, res) => {
  async.parallel(
    {
      book_count: (callback) => {
        Book.countDocuments({}, callback);
      },
      book_instance_count: (callback) => {
        BookInstance.countDocuments({}, callback);
      },
      book_instance_available_count: (callback) => {
        BookInstance.countDocuments({ status: 'Available' }, callback);
      },
      author_count: (callback) => {
        Author.countDocuments({}, callback);
      },
      genre_count: (callback) => {
        Genre.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render('index', {
        title: 'Local Library Home',
        error: err,
        data: results,
      });
    }
  );
};

// Display list of books
exports.book_list = (req, res, next) => {
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, list_books) => {
      if (err) {
        return next(err);
      }
      res.render('book_list', { title: 'Book list', book_list: list_books });
    });
};

// Display detail page for a specific book
exports.book_detail = (req, res,next) => {
  async.parallel({
    book: function(callback){
      Book.findById(req.params.id)
      .populate('author')
      .populate('genre')
      .exec(callback);
    },
    book_instance: function(callback){
      BookInstance.find({'book':req.params.id})
      .exec(callback);
    }
  }, function(err,results){
    if(err){return next(err)}
    if(results.book == null){
      var err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }
    res.render('book_detail', {title: results.book.title, book: results.book,book_instances: results.book_instance})
  })
};

// Display Book create form on Get
exports.book_create_get = function(req, res,next){
  async.parallel({
    authors: function(callback){
      Author.find(callback);
    },
    genres: function(callback){
      Genre.find(callback);
    }
  },function(err, results) {
      if(err){return next(err)}
      res.render('book_form', {title:'Create Book', authors:results.authors,genres: results.genres})
  }
  )
};

// Handle Book create on POST
exports.book_create_post = [
  (req,res,next)=>{
    if(!(req.body.genre instanceof Array)){
      if(typeof req.body.genre ==='undefined')
      req.body.body.genre = [];
      else
      req.body.genre = new Array(req.body.genre);
    }
    next();
  },
  
  body('title','Title must not be empty.').trim().isLength({min:1}).escape(),
  body('author', 'Auhtor must not be empty').trim().isLength({min:1}).escape(),
  body('summary', 'Summary must not be empty').trim().isLength({min:1}).escape(),
  body('isbn', "ISBN must not be empty").trim().isLength({min:1}).escape(),
  body('genre.*').trim().isLength({min:1}).escape(),
  body().escape(),
  
  (req,res,next)=>{
    const errors = validationResult(req);
    
    var book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
    });
    
    if(!errors.isEmpty()){
      async.parallel({
        authors: function(callback){
          Author.find(callback);
        },
        genres: function(callback){
          Genre.find(callback);
        },   
      }, function(err, results) {
          if(err){return next(err)}
        for(let i = 0; i< results.genres.length; i++){
          if(book.genre.indexOf(results.genres[i]._id)> -1){
            results.genres[i].checked='true';
          }
        }
        res.render('book_form',{title:'Create Book', authors:results.authors, genres:results.genres, book:book, errors: errors.array()})
      });
      return;
    }
    else{
      book.save(function(err){
        if(err){return next(err)}
        res.redirect(book.url)
      });
    }
  }  
];

// Display Book delete  form on GET
exports.book_delete_get = (req, res) => {
  res.send('Not Implemented: Book delete GET');
};

// Handle Book delete on POST
exports.book_delete_post = (req, res) => {
  res.send('Not Implemented: Book delete POST');
};

// Display Book update form on GET
exports.book_update_get = (req, res) => {
  res.send('Not Implemented: Book update GET');
};

// Handle Book update on POST
exports.book_update_post = (req, res) => {
  res.send('Not Implemented: Book update POST');
};
