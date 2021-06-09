const express = require('express');
const config = require('config');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  }),
);
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/uploads', express.static('static'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/spec', require('./routes/specialties.routes'));
app.use('/api/college', require('./routes/college.routes'));
app.use('/api/edu', require('./routes/edu.routes'));
app.use('/api/abit', require('./routes/abit.routes'));
app.use('/api/news', require('./routes/news.routes'));
app.use('/api/documents', require('./routes/documents.routes'));
app.use('/api/worker', require('./routes/worker.routes'));
app.use('/api/file', require('./routes/files.routes'));

const PORT = process.env.PORT || config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
