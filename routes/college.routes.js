const { Router } = require('express');
const config = require('config');
const College = require('../models/CollegePost');
const auth = require('../middleware/auth.middleware');
const router = Router();
const Uuid = require('uuid');
const moment = require('moment');

// /api/college/add
router.post('/add', auth, async (req, res) => {
  try {
    const files = req.files;
    const fields = req.body;

    const collegePost = new College({
      title: fields.title,
      published: moment().format('DD.MM.YYYY'),
      clicks: 0,
      editorData: fields.editorData,
      documents: [],
    });

    for (file in files) {
      const fileName = Uuid.v4() + files[file].name.match(/\.[^/.]+$/, '');
      files[file].mv(config.get('staticPath') + '\\' + fileName);
      collegePost.documents.push({ link: fileName, title: files[file].name });
    }

    console.log(collegePost);
    await collegePost.save();
    return res.status(201).json({ collegePost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/college/
router.get('/', async (req, res) => {
  try {
    const collegePosts = await College.find();
    res.json(collegePosts);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/college/:id
router.get('/:id', async (req, res) => {
  try {
    const collegePost = await College.findById(req.params.id);
    if (collegePost) {
      collegePost.clicks ? collegePost.clicks++ : (collegePost.clicks = 1);
      collegePost.save();
    }

    res.json(collegePost);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/college/delete/:id
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const collegePost = await College.findById(id).remove();
    res.json({ collegePost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/college/edit/:id
router.put('/edit/:id', auth, async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);

    const fields = req.body;
    const files = req.files;
    const id = req.params.id;
    const collegePost = await College.findById(id);
    const numberOfChangeableFields = Object.keys(fields).length;

    collegePost.documents = [];
    for (let i = 0; i < numberOfChangeableFields; i++) {
      if (fields[`file-link_${i}`]) {
        collegePost.documents.push({
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
      collegePost.documents.push({ link: fileName, title: files[file].name });
    }

    for (changableField in fields) {
      collegePost[changableField] = fields[changableField];
    }
    await collegePost.save();
    console.log(collegePost);

    return res.status(201).json({ collegePost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
