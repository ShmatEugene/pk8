const { Router } = require('express');
const config = require('config');
const News = require('../models/News');
const auth = require('../middleware/auth.middleware');
const router = Router();
const Uuid = require('uuid');
const moment = require('moment');

// /api/news/add
router.post('/add', auth, async (req, res) => {
  try {
    const files = req.files;
    const fields = req.body;

    const news = new News({
      title: fields.title,
      thumbnailLink: fields.thumbnailLink,
      published: moment().format('DD.MM.YYYY'),
      clicks: 0,
      editorData: fields.editorData,
      documents: [],
    });

    for (file in files) {
      const fileName = Uuid.v4() + files[file].name.match(/\.[^/.]+$/, '');
      files[file].mv(config.get('staticPath') + '\\' + fileName);
      news.documents.push({ link: fileName, title: files[file].name });
    }

    console.log(news);
    await news.save();
    return res.status(201).json({ news });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/news/
router.get('/', async (req, res) => {
  try {
    const allNews = await News.find();
    res.json(allNews);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/news/:id
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (news) {
      news.clicks ? news.clicks++ : (news.clicks = 1);
      news.save();
    }

    res.json(news);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/news/delete/:id
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const news = await News.findById(id).remove();
    res.json({ news });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/news/edit/:id
router.put('/edit/:id', auth, async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);

    const fields = req.body;
    const files = req.files;
    const id = req.params.id;
    const news = await News.findById(id);
    const numberOfChangeableFields = Object.keys(fields).length;

    news.documents = [];
    for (let i = 0; i < numberOfChangeableFields; i++) {
      if (fields[`file-link_${i}`]) {
        news.documents.push({
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
      news.documents.push({ link: fileName, title: files[file].name });
    }

    for (changableField in fields) {
      news[changableField] = fields[changableField];
    }
    await news.save();
    console.log(news);

    return res.status(201).json({ news });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
