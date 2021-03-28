const { Router } = require('express');
const config = require('config');
const AbitPost = require('../models/AbitPost');
const auth = require('../middleware/auth.middleware');
const router = Router();
const Uuid = require('uuid');
const moment = require('moment');

// /api/abit/add
router.post('/add', auth, async (req, res) => {
  try {
    const files = req.files;
    const fields = req.body;

    const abitPost = new AbitPost({
      title: fields.title,
      published: moment().format('DD.MM.YYYY'),
      clicks: 0,
      editorData: fields.editorData,
      documents: [],
    });

    for (file in files) {
      const fileName = Uuid.v4() + files[file].name.match(/\.[^/.]+$/, '');
      files[file].mv(config.get('staticPath') + '\\' + fileName);
      abitPost.documents.push({ link: fileName, title: files[file].name });
    }

    console.log(abitPost);
    await abitPost.save();
    return res.status(201).json({ abitPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/abit/
router.get('/', async (req, res) => {
  try {
    const abitPosts = await AbitPost.find();
    res.json(abitPosts);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/abit/:id
router.get('/:id', async (req, res) => {
  try {
    const abitPost = await AbitPost.findById(req.params.id);
    if (abitPost) {
      abitPost.clicks ? abitPost.clicks++ : (abitPost.clicks = 1);
      abitPost.save();
    }

    res.json(abitPost);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/abit/delete/:id
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const abitPost = await AbitPost.findById(id).remove();
    res.json({ abitPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/abit/edit/:id
router.put('/edit/:id', auth, async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);

    const fields = req.body;
    const files = req.files;
    const id = req.params.id;
    const abitPost = await AbitPost.findById(id);
    const numberOfChangeableFields = Object.keys(fields).length;

    abitPost.documents = [];
    for (let i = 0; i < numberOfChangeableFields; i++) {
      if (fields[`file-link_${i}`]) {
        abitPost.documents.push({
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
      abitPost.documents.push({ link: fileName, title: files[file].name });
    }

    for (changableField in fields) {
      abitPost[changableField] = fields[changableField];
    }
    await abitPost.save();
    console.log(abitPost);

    return res.status(201).json({ abitPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
