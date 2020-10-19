var BookInstance = require('../models/bookinstance');
var Book = require('../models/book')

var async = require('async')
const { body, validationResult} = require('express-validator');
const book = require('../models/book');

// Display list of bookinstances
exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) {
        return next(err);
      }
      res.render('bookinstance_list', {
        title: 'Book Instance List',
        bookinstance_list: list_bookinstances,
      });
    });
};

// Display detail page for a specific bookinstance
exports.bookinstance_detail = function(req, res, next){
  async.parallel({
    book_instance: function(callback){
      BookInstance.findById(req.params.id)
      .populate('book')
      .exec(function (err,book_instance){
        if(err){return next(err)}
        if(book_instance == null){
          var err = new Error('Book copy not found.')
          err.status = 404;
          return next(err);
        }
        res.render('bookinstance_detail',{title:'Copy: '+ book_instance.book.title,bookinstance:book_instance})
      })
    }
  });
};

// Display BookInstance create form on Get
exports.bookinstance_create_get = function(req,res,next){
  Book.find({},'title')
  .exec(function(err,books){
    if(err){return next(err)}
    res.render('bookinstance_form',{title:'Create BookInstance', book_list: books});
  })
};

//Handle BookInstance create on POST
exports.bookinstance_create_post = [

  body('book','Book must be specified').trim().isLength({min:1}).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({min:1}).escape(),
  body('status').escape(),
  body('due_back','Invalid Date').optional({checkFalsy: true}).isISO8601().toDate(),

  (req,res,next)=>{

    const errors = validationResult(req)

    var bookinstance = new BookInstance(
      {
        book:req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
      });

    if (!errors.isEmpty()){
      Book.find({},'title')
      .exec(function (err,books){
        if(err){return next(err)}
        res.render('bookinstance_form', {title:'Create BookInstance',book_list: books, selected_book: bookinstance._id, errors:errors.array(), book_instance:bookinstance})
      })
      return;
    }
    else{
      bookinstance.save(function(err){
        if(err){return next(err)}
        res.redirect(bookinstance.url);
      })
    }
  }

];

// Display BookInstance delete  form on GET
exports.bookinstance_delete_get = function(req, res, next) {
  async.parallel({
    book_instance:function(callback){
      BookInstance.findById(req.params.id)
      .populate('book')
      .exec(callback)
    }
  },function(err,results){
    if(err){return next(err)}
    if(results.bookinstance === null){
      res.redirect('/catalog/bookinstances')
    }
    res.render('bookinstance_delete', {title:'Delete Book Instance',book_instance:results.book_instance})
  })
};

// Handle BookInstance delete on POST
exports.bookinstance_delete_post = function(req, res, next) {
  async.parallel(
    {
      book_instance: function(callback){
        BookInstance.findById(req.params.id).exec(callback);
      }
    }, 
    function(err, results) {
      if (err) {
        return next(err);
      }
      BookInstance.findByIdAndRemove(req.body.bookinstanceid,function deleteBookInstance(err){
        if(err){return next(err)};
        res.redirect('/catalog/bookinstances');
      })
    }
  )
};

// Display BookInstance update form on GET
exports.bookinstance_update_get = function(req, res, next) {
  async.parallel(
    {
      book_instance : function(callback){
        BookInstance.findById(req.params.id)
        .populate('book')
        .exec(callback)
      },
      books:function(callback){
        Book.find(callback)
      }
    }, function(err,results){
      if(err){return next(err)}
      if(results.book_instance==null){
        var err = new Error('Book copy not found')
        err.status = 404;
        return next(err)
      }
      res.render('bookinstance_form',{title: 'Update Book Instance', book_list: results.books,selected_book:results.book_instance.book._id, book_instance: results.book_instance})
    }
  )
};

// Handle BookInstance update on POST
exports.bookinstance_update_post = [
  body('book','Book must be specified').trim().isLength({min:1}).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({min:1}).escape(),  
  body('status').escape(),
  body('due_back','Invalid date').optional({checkFalsy:true}).isISO8601().toDate(),

(req,res,next) => {
  const errors = validationResult(req);

  var book_instance = new BookInstance(
    {
      book:req.body.book,
      imprint:req.body.imprint,
      status:req.body.status,
      due_back:req.body.due_back,
      _id:req.params.id
    });

  if(!errors.isEmpty()){
    Book.find({},title)
      .exec(function(err,books){
        if(err){return next(err)}
        res.render('bookinstance_form',{title: 'Update Book Instance',book_list : books, selected_book:book_instance.book._id,errors:errors.array(),book_instance: book_instance})
      });
      return;
  } else {
    BookInstance.findByIdAndUpdate(req.params.id,book_instance,{},function(err,thebookinstance){
      if(err){return next(err)}
      res.redirect(thebookinstance.url)
    })
  }
}

];
