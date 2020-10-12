var Genre = require('../models/genre');

// Display list of genres
exports.genre_list = (req, res, next) => {
  Genre.find()
    .populate('genre')
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) {
        return next(err);
      }
      res.render('genre_list', {
        title: 'Genre List',
        genre_list: list_genres,
      });
    });
};

// Display detail page for a specific genre
exports.genre_detail = (req, res) => {
  res.send('Not Implemented: Genre detail: ' + req.params.id);
};

// Display Genre create form on Get
exports.genre_create_get = (req, res) => {
  res.send('Not Implemented: Genre create GET');
};

// Handle Genre create on POST
exports.genre_create_post = (req, res) => {
  res.send('Not Implemented: Genre create POST');
};

// Display Genre delete  form on GET
exports.genre_delete_get = (req, res) => {
  res.send('Not Implemented: Genre delete GET');
};

// Handle Genre delete on POST
exports.genre_delete_post = (req, res) => {
  res.send('Not Implemented: Genre delete POST');
};

// Display Genre update form on GET
exports.genre_update_get = (req, res) => {
  res.send('Not Implemented: Genre update GET');
};

// Handle Genre update on POST
exports.genre_update_post = (req, res) => {
  res.send('Not Implemented: Genre update POST');
};
