var Book = require("../models/book");


exports.index = (req,res)=>{
  res.send("Not Implemented: Site Home Page")
};

// Display list of books
exports.book_list = (req,res)=>{
  res.send('Not Implemented: Book list');
};

// Display detail page for a specific book
exports.book_detail = (req,res)=>{
  res.send('Not Implemented: Book detail: ' + req.params.id);
};

// Display Book create form on Get
exports.book_create_get = (req,res)=>{
  res.send('Not Implemented: Book create GET');
};

// Handle Book create on POST
exports.book_create_post = (req,res)=>{
  res.send('Not Implemented: Book create POST');
};

// Display Book delete  form on GET
exports.book_delete_get = (req,res)=>{
  res.send('Not Implemented: Book delete GET');
};

// Handle Book delete on POST
exports.book_delete_post = (req,res)=>{
  res.send('Not Implemented: Book delete POST');
};

// Display Book update form on GET
exports.book_update_get = (req,res)=>{
  res.send('Not Implemented: Book update GET');
};

// Handle Book update on POST
exports.book_update_post = (req,res)=>{
  res.send('Not Implemented: Book update POST');
};



