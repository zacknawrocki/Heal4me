const express = require('express');
const connectDB = require('./config/db');
const app = express();
const fs = require('fs')
require('./socket/io');

const modelPath = './recommender/classifier.pkl';

try {
  if (!fs.existsSync(modelPath)) {
    const path = require('path');
    const {spawn} = require('child_process');
    spawn('python', [path.join(__dirname, './recommender/sentiment_classifier.py'),
      './recommender/si_data_sorted.csv']);
  }
} catch(err) {
  console.error(err)
}
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/contact', require('./routes/api/contact'));
app.use('/api/home', require('./routes/api/home'));
app.use('/api/images', require('./routes/api/images'));
app.use('/api/grade', require('./routes/api/grade'));

const PORT = /*process.env.PORT || */5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;