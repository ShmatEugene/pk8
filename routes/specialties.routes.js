const { Router } = require('express');
const config = require('config');
const Speciality = require('../models/Speciality');
const auth = require('../middleware/auth.middleware');
const router = Router();
const Uuid = require('uuid');
const moment = require('moment');

// /api/spec/add
router.post('/add', auth, async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);

    const files = req.files;
    const specialityFields = req.body;

    const spec = new Speciality({
      code: specialityFields.code,
      title: specialityFields.title,
      published: moment().format('DD.MM.YYYY'),
      yearsToStudy: specialityFields.yearsToStudy,
      stateFundedPlacecesCounter: specialityFields.stateFundedPlacecesCounter,
      stateAccreditation: true,
      desc: specialityFields.desc,
      prospects: specialityFields.prospects,
      documents: [],
    });

    for (file in files) {
      const fileName = Uuid.v4() + files[file].name.match(/\.[^/.]+$/, '');
      files[file].mv(config.get('staticPath') + '\\' + fileName);
      spec.documents.push({ link: fileName, title: files[file].name });
    }

    console.log(spec);
    await spec.save();
    return res.status(201).json({ spec });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/spec/
router.get('/', async (req, res) => {
  try {
    const specs = await Speciality.find();
    res.json(specs);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/spec/:id
router.get('/:id', async (req, res) => {
  try {
    const spec = await Speciality.findById(req.params.id);

    if (spec) {
      spec.clicks ? spec.clicks++ : (spec.clicks = 1);
      spec.save();
    }

    res.json(spec);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/spec/delete/:id
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const spec = await Speciality.findById(id).remove();
    res.json({ spec });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// /api/spec/edit/:id
router.put('/edit/:id', auth, async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);

    const fields = req.body;
    const files = req.files;
    const id = req.params.id;
    const spec = await Speciality.findById(id);
    const numberOfChangeableFields = Object.keys(fields).length;

    spec.documents = [];
    for (let i = 0; i < numberOfChangeableFields; i++) {
      if (fields[`file-link_${i}`]) {
        spec.documents.push({
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
      spec.documents.push({ link: fileName, title: files[file].name });
    }

    for (changableField in fields) {
      spec[changableField] = fields[changableField];
    }
    await spec.save();
    console.log(spec);

    return res.status(201).json({ spec });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
