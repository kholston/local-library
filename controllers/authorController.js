var Author = require('../models/author');

// Display list of authors
exports.author_list = (req, res, next) => {
  Author.find()
    .populate('author')
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) {
        return next(err);
      }
      res.render('author_list', {
        title: 'Author List',
        author_list: list_authors,
      });
    });
};

// Display detail page for a specific author
exports.author_detail = (req, res) => {
  res.send('Not Implemented: Author detail: ' + req.params.id);
};

// Display Author create form on Get
exports.author_create_get = (req, res) => {
  res.send('Not Implemented: Author create GET');
};

//Handle Author create on POST
exports.author_create_post = (req, res) => {
  res.send('Not Implemented: Author create POST');
};

// Display Author delete  form on GET
exports.author_delete_get = (req, res) => {
  res.send('Not Implemented: Author delete GET');
};

// Handle Author delete on POST
exports.author_delete_post = (req, res) => {
  res.send('Not Implemented: Author delete POST');
};

// Display Author update form on GET
exports.author_update_get = (req, res) => {
  res.send('Not Implemented: Author update GET');
};

// Handle Author update on POST
exports.author_update_post = (req, res) => {
  res.send('Not Implemented: Author update POST');
};
