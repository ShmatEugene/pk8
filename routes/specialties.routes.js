const { Router } = require('express');
const config = require('config');
const Speciality = require('../models/Speciality');
const auth = require('../middleware/auth.middleware');
const router = Router();
const Uuid = require('uuid');
const fs = require('fs');

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
    res.json(spec);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
