const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-blog')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error: '+ err));