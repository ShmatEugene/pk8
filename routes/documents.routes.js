const { Router } = require('express');
const config = require('config');
const DocumentPost = require('../models/DocumentPost');
const auth = require('../middleware/auth.middleware');
const router = Router();
const Uuid = require('uuid');
const moment = require('moment');

// /api/documents/add
router.post('/add', auth, async (req, res) => {
  try {
    const files = req.files;
    const fields = req.body;

    const documentPost = new DocumentPost({
      title: fields.title,
      published: moment().format('DD.MM.YYYY'),
      clicks: 0,
      editorData: fields.editorData,
      documents: [],
    });

    for (file in files) {
      const fileName = Uuid.v4() + files[file].name.match(/\.[^/.]+$/, '');
      files[file].mv(config.get('staticPath') + '\\' + fileName);
      documentPost.documents.push({ link: fileName, title: files[file].name });
    }

    console.log(documentPost);
    await documentPost.save();
    return res.status(201).json({ documentPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/documents/
router.get('/', async (req, res) => {
  try {
    const documentPosts = await DocumentPost.find();
    res.json(documentPosts);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/documents/:id
router.get('/:id', async (req, res) => {
  try {
    const documentPost = await DocumentPost.findById(req.params.id);
    if (documentPost) {
      documentPost.clicks ? documentPost.clicks++ : (documentPost.clicks = 1);
      documentPost.save();
    }

    res.json(documentPost);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/documents/delete/:id
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const documentPost = await DocumentPost.findById(id).remove();
    res.json({ documentPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/documents/edit/:id
router.put('/edit/:id', auth, async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);

    const fields = req.body;
    const files = req.files;
    const id = req.params.id;
    const documentPost = await DocumentPost.findById(id);
    const numberOfChangeableFields = Object.keys(fields).length;

    documentPost.documents = [];
    for (let i = 0; i < numberOfChangeableFields; i++) {
      if (fields[`file-link_${i}`]) {
        documentPost.documents.push({
          link: fields[`file-link_${i}`],
          title: fields[`file-title_${i}`],
        });
        delete fields[`file-link_${i}`];
        delete fields[`file-title_${i}`];
      } else {
        break;
      }
    }

    for (file in files) {
      const fileName = Uuid.v4() + files[file].name.match(/\.[^/.]+$/, '');
      files[file].mv(config.get('staticPath') + '\\' + fileName);
      documentPost.documents.push({ link: fileName, title: files[file].name });
    }

    for (changableField in fields) {
      documentPost[changableField] = fields[changableField];
    }
    await documentPost.save();
    console.log(documentPost);

    return res.status(201).json({ documentPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
