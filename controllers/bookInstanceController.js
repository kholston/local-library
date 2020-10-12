var BookInstance = require('../models/bookinstance');

var async = require('async')

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
exports.bookinstance_detail = (req, res, next) => {
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
exports.bookinstance_create_get = (req, res) => {
  res.send('Not Implemented: BookInstance create GET');
};

//Handle BookInstance create on POST
exports.bookinstance_create_post = (req, res) => {
  res.send('Not Implemented: BookInstance create POST');
};

// Display BookInstance delete  form on GET
exports.bookinstance_delete_get = (req, res) => {
  res.send('Not Implemented: BookInstance delete GET');
};

// Handle BookInstance delete on POST
exports.bookinstance_delete_post = (req, res) => {
  res.send('Not Implemented: BookInstance delete POST');
};

// Display BookInstance update form on GET
exports.bookinstance_update_get = (req, res) => {
  res.send('Not Implemented: BookInstance update GET');
};

// Handle BookInstance update on POST
exports.bookinstance_update_post = (req, res) => {
  res.send('Not Implemented: BookInstance update POST');
};
