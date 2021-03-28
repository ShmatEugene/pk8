const { Router } = require('express');
const config = require('config');
const File = require('../models/File');
const auth = require('../middleware/auth.middleware');
const router = Router();
const Uuid = require('uuid');

// /file/add
router.post('/add', async (req, res) => {
  try {
    const files = req.files;

    const newFile = new File();

    for (file in files) {
      const fileName = Uuid.v4() + files[file].name.match(/\.[^/.]+$/, '');
      files[file].mv(config.get('staticPath') + '\\' + fileName);
      newFile.fileName = fileName;
    }

    const response = {
      success: 1,
      file: {
        url: config.get('baseUrl') + '/uploads/' + newFile.fileName,
        name: newFile.fileName,
      },
    };

    console.log(response);
    //await newFile.save();
    return res.status(201).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: 0 });
  }
});

module.exports = router;
