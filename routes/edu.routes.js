const { Router } = require('express');
const config = require('config');
const EduPost = require('../models/EduPost');
const auth = require('../middleware/auth.middleware');
const router = Router();
const Uuid = require('uuid');
const moment = require('moment');

// /api/edu/add
router.post('/add', auth, async (req, res) => {
  try {
    const files = req.files;
    const fields = req.body;

    const eduPost = new EduPost({
      title: fields.title,
      published: moment().format('DD.MM.YYYY'),
      clicks: 0,
      editorData: fields.editorData,
      documents: [],
    });

    for (file in files) {
      const fileName = Uuid.v4() + files[file].name.match(/\.[^/.]+$/, '');
      files[file].mv(config.get('staticPath') + '\\' + fileName);
      eduPost.documents.push({ link: fileName, title: files[file].name });
    }

    console.log(eduPost);
    await eduPost.save();
    return res.status(201).json({ eduPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/edu/
router.get('/', async (req, res) => {
  try {
    const eduPosts = await EduPost.find();
    res.json(eduPosts);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/edu/:id
router.get('/:id', async (req, res) => {
  try {
    const eduPost = await EduPost.findById(req.params.id);
    if (eduPost) {
      eduPost.clicks ? eduPost.clicks++ : (eduPost.clicks = 1);
      eduPost.save();
    }

    res.json(eduPost);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/edu/delete/:id
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const eduPost = await EduPost.findById(id).remove();
    res.json({ eduPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/edu/edit/:id
router.put('/edit/:id', auth, async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);

    const fields = req.body;
    const files = req.files;
    const id = req.params.id;
    const eduPost = await EduPost.findById(id);
    const numberOfChangeableFields = Object.keys(fields).length;

    eduPost.documents = [];
    for (let i = 0; i < numberOfChangeableFields; i++) {
      if (fields[`file-link_${i}`]) {
        eduPost.documents.push({
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
      eduPost.documents.push({ link: fileName, title: files[file].name });
    }

    for (changableField in fields) {
      eduPost[changableField] = fields[changableField];
    }
    await eduPost.save();
    console.log(eduPost);

    return res.status(201).json({ eduPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
