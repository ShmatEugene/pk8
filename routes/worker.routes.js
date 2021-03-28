const { Router } = require('express');
const config = require('config');
const Worker = require('../models/Worker');
const auth = require('../middleware/auth.middleware');
const router = Router();
const Uuid = require('uuid');
const moment = require('moment');

// /api/worker/add
router.post('/add', auth, async (req, res) => {
  try {
    const fields = req.body;

    const worker = new Worker({
      title: fields.title,
      department: fields.department,
      published: moment().format('DD.MM.YYYY'),
      clicks: 0,
      desc: fields.desc,
      imgLink: fields.imgLink,
    });

    console.log(worker);
    await worker.save();
    return res.status(201).json({ worker });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/worker/
router.get('/', async (req, res) => {
  try {
    const allWorker = await Worker.find();
    res.json(allWorker);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/worker/:id
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (worker) {
      worker.clicks ? worker.clicks++ : (worker.clicks = 1);
      worker.save();
    }

    res.json(worker);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/worker/delete/:id
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const worker = await Worker.findById(id).remove();
    res.json({ worker });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/worker/edit/:id
router.put('/edit/:id', auth, async (req, res) => {
  try {
    console.log(req.body);

    const fields = req.body;
    const id = req.params.id;
    const worker = await Worker.findById(id);

    for (changableField in fields) {
      worker[changableField] = fields[changableField];
    }
    await worker.save();
    console.log(worker);

    return res.status(201).json({ worker });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
